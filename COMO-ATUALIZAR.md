# Como atualizar a ferramenta

Passo a passo para subir uma nova versão do `index.html` no GitHub  
e publicar automaticamente em [tbaccon.github.io/crm-abix](https://tbaccon.github.io/crm-abix).

---

## Antes de começar

Ative a exibição de extensões de arquivo no Windows para evitar o problema do `index.html.html`:

1. Abra qualquer pasta no Windows Explorer
2. Clique em **Ver** na barra superior
3. Marque **Extensões de nomes de arquivo**

Você precisará fazer isso apenas uma vez.

---

## Passo a passo

### 1. Obtenha o arquivo atualizado

Baixe o novo `index.html` gerado pelo Claude.  
Confirme que o nome do arquivo é exatamente `index.html` — sem `.html.html` no final.

---

### 2. Acesse o repositório

Abra [github.com/tbaccon/crm-abix](https://github.com/tbaccon/crm-abix) e faça login.

---

### 3. Abra o arquivo atual para edição

Clique no arquivo `index.html` na listagem do repositório.  
Clique no ícone de **lápis** (✏️) no canto superior direito do conteúdo.

---

### 4. Substitua o conteúdo

1. Pressione **Ctrl + A** para selecionar tudo
2. Abra o novo `index.html` num editor de texto (ex: Notepad)
3. Selecione tudo (**Ctrl + A**) e copie (**Ctrl + C**)
4. Volte ao GitHub e cole (**Ctrl + V**)

---

### 5. Escreva a mensagem de commit

Role até o final da página. Você verá o campo **Commit changes**.

Use o padrão `tipo: descrição`:

```
feat: descrição da nova funcionalidade
fix:  descrição do que foi corrigido
chore: ajuste técnico sem impacto para o usuário
```

**Exemplos:**
```
feat: adiciona filial Recife para estados PE, AL, PB
fix:  corrige preço do RÁDIO HYTERA PD416
feat: atualiza tabela de preços fevereiro 2026
chore: ajusta cor dos badges do kit
```

Deixe a opção **Commit directly to the main branch** selecionada.

Clique em **Commit changes**.

---

### 6. Aguarde a publicação

O GitHub Pages leva **1 a 3 minutos** para publicar a nova versão.

Você pode acompanhar o progresso em:  
**Settings → Pages** — quando aparecer o banner verde, está no ar.

Acesse [tbaccon.github.io/crm-abix](https://tbaccon.github.io/crm-abix) e pressione  
**Ctrl + Shift + R** (hard refresh) para garantir que o navegador carrega a versão nova.

---

## Subindo o README.md pela primeira vez

Se ainda não subiu o `README.md` no repositório:

1. Acesse [github.com/tbaccon/crm-abix](https://github.com/tbaccon/crm-abix)
2. Clique em **Add file → Upload files**
3. Arraste os arquivos `README.md` e `COMO-ATUALIZAR.md`
4. Mensagem de commit: `docs: adiciona README e guia de atualização`
5. Clique em **Commit changes**

O README aparecerá automaticamente na página principal do repositório.

---

## Checklist rápido

```
[ ] Arquivo nomeado exatamente como index.html
[ ] Conteúdo colado corretamente (sem texto faltando no início ou fim)
[ ] Mensagem de commit descritiva escrita
[ ] Commit feito no branch main
[ ] Aguardou 1-3 minutos
[ ] Hard refresh no navegador (Ctrl + Shift + R)
```

---

## Problemas comuns

| Problema | Causa | Solução |
|---|---|---|
| Página em branco | Arquivo vazio ou corrompido | Verifique se o conteúdo foi colado corretamente |
| Dropdown não funciona | Arquivo modificado por proxy durante download | Baixe novamente e suba sem abrir em outros programas |
| Versão antiga ainda aparece | Cache do navegador | Ctrl + Shift + R |
| `index.html.html` | Extensões de arquivo ocultas no Windows | Ative a exibição de extensões e renomeie |
| 404 após commit | GitHub Pages ainda processando | Aguarde mais 2 minutos |
