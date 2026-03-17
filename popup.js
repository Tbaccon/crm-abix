/*
  popup.js — roda quando o usuário clica no ícone da extensão

  Fluxo:
  1. Injeta o content.js na aba ativa (a página do Dynamics)
  2. content.js lê os campos e retorna os dados
  3. Mostramos uma prévia para o usuário confirmar
  4. Ao clicar no botão, abrimos o formulário CRM com os dados na URL
*/

const URL_CRM = 'https://tbaccon.github.io/crm-abix/';

const statusEl  = document.getElementById('status');
const previewEl = document.getElementById('preview');
const btnEl     = document.getElementById('btn');

let dadosCapturados = null;

// Ao abrir o popup, injeta o script na aba ativa e pede os dados
chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
  const tab = tabs[0];

  // Verifica se estamos numa página do Dynamics
  if (!tab.url || !tab.url.includes('dynamics.com')) {
    statusEl.textContent = '⚠ Abra um negócio no Dynamics 365 primeiro.';
    statusEl.className = 'err';
    return;
  }

  try {
    // Injeta o content.js na página ativa e executa a função lerDados()
    // scripting.executeScript é a forma do Manifest V3 de rodar código na página
    const resultados = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });

    // Após injetar, chama a função que lê os campos
    const leitura = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => { const d = window.__abixLerDados ? window.__abixLerDados() : {}; d.urlCompartilhar = window.__abixLerUrlCompartilhar ? window.__abixLerUrlCompartilhar() : window.location.href; return d; }
    });

    const dados = leitura[0]?.result;

    if (!dados || (!dados.nome && !dados.celular && !dados.email)) {
      statusEl.textContent = '⚠ Campos não encontrados. Verifique se está na tela do negócio.';
      statusEl.className = 'err';
      return;
    }

    // Exibe a prévia
    dadosCapturados = dados;
    document.getElementById('p-nome').textContent  = dados.nome      || '—';
    document.getElementById('p-cel').textContent   = dados.celular   || '—';
    document.getElementById('p-tel').textContent   = dados.telComercial || '—';
    document.getElementById('p-email').textContent = dados.email     || '—';

    previewEl.classList.add('show');
    statusEl.textContent = '✓ Dados encontrados';
    statusEl.className = 'ok';
    btnEl.disabled = false;

  } catch (err) {
    statusEl.textContent = '✗ Erro ao ler a página: ' + err.message;
    statusEl.className = 'err';
  }
});

// Abre o formulário CRM com os dados como parâmetros na URL
btnEl.addEventListener('click', () => {
  if (!dadosCapturados) return;

  // URLSearchParams monta os parâmetros de forma segura
  // encode automático de caracteres especiais, acentos, etc.
  const params = new URLSearchParams({
    nome:  dadosCapturados.nome          || '',
    cel:   dadosCapturados.celular       || '',
    tel:   dadosCapturados.telComercial  || '',
    email: dadosCapturados.email         || '',
    url:   dadosCapturados.urlCompartilhar || dadosCapturados.url || '',
  });

  // Abre uma nova aba com o formulário já preenchido
  chrome.tabs.create({ url: URL_CRM + '?' + params.toString() });
});
