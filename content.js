/*
  content.js — lê os campos de contato da página do Dynamics 365
  
  O Dynamics da Abix usa atributos aria-label em português
  para identificar os campos. O valor fica em StaticText
  (span/div com role="presentation" ou texto direto no input).
*/

window.__abixLerDados = function() {

  /*
    lerCampo(rotulos) — busca pelo aria-label do input em português.
    O Dynamics renderiza cada campo como:
      <input aria-label="Celular" value="21993822037">
    ou o valor fica em um span filho quando o campo é somente leitura.
  */
  function lerCampo(rotulos) {
    for (const rotulo of rotulos) {

      // 1. Busca direto pelo aria-label — forma mais confiável
      const seletores = rotulos.map(r =>
        `input[aria-label="${r}"], textarea[aria-label="${r}"]`
      ).join(', ');

      const input = document.querySelector(
        `input[aria-label="${rotulo}"], textarea[aria-label="${rotulo}"]`
      );

      if (input) {
        // Valor digitado no input
        if (input.value && !input.value.toLowerCase().startsWith('digite')) {
          return input.value.trim();
        }

        // Valor renderizado como texto estático ao lado do input
        // (acontece quando o campo tem um link de ação como "ligar" ou "enviar email")
        const parent = input.closest('div[class*="field"], div[data-id]') || input.parentElement?.parentElement;
        if (parent) {
          // Pega todos os textos filhos, ignora os que são tooltips
          const spans = parent.querySelectorAll('span, div');
          for (const span of spans) {
            const t = span.textContent.trim();
            if (t && t !== rotulo && !t.toLowerCase().startsWith('digite') && t.length < 200) {
              return t;
            }
          }
        }
      }
    }
    return '';
  }

  // Nome e Sobrenome — rótulos exatos como aparecem no Dynamics da Abix
  const primeiroNome = lerCampo(['Nome']);
  const sobrenome    = lerCampo(['Sobrenome']);
  const nome = [primeiroNome, sobrenome].filter(Boolean).join(' ').trim();

  // Telefones
  const celular      = lerCampo(['Celular', 'Telefone celular']);
  const telComercial = lerCampo(['Telefone Comercial', 'Telefone comercial']);

  // Email
  const email = lerCampo(['Email', 'E-mail']);

  return { nome, celular, telComercial, email };
};
