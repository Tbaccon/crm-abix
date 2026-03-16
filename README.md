# Abertura de CRM — Abix

Ferramenta interna para geração automática de emails de abertura de CRM no backoffice comercial.

Acesse em: **[tbaccon.github.io/crm-abix](https://tbaccon.github.io/crm-abix)**

---

## O que faz

Preencha os dados do negócio fechado e clique em **Gerar Email**. A ferramenta monta automaticamente o corpo do email para o backoffice, com kit de locação itemizado, total com desconto progressivo e indicação de filial.

**Fluxo completo:**

1. Digite o CNPJ → razão social, estado, filial e dados cadastrais preenchidos automaticamente
2. Selecione o rádio → bateria, base e trafo adicionados ao kit automaticamente
3. Informe quantidade e prazo → preços calculados com desconto progressivo
4. Adicione acessórios opcionais se necessário
5. Cole a URL do negócio no Dynamix
6. Clique em **Gerar Email** → copie o corpo e cole no Outlook

---

## Funcionalidades

| Funcionalidade | Detalhe |
|---|---|
| Consulta de CNPJ | Via BrasilAPI — dados da Receita Federal em tempo real |
| Badges cadastrais | Situação, natureza jurídica, porte, Simples/MEI |
| Filial automática | Detectada pelo estado do CNPJ consultado |
| Catálogo embutido | 113 produtos com preços de locação |
| Kit automático | Bateria, base (R$2) e trafo (R$3) adicionados ao selecionar o rádio |
| Desconto progressivo | 12m (-4%), 24m (-10%), 36m (-13,5%), 48m (-15%) |
| Acessórios opcionais | Buscados no catálogo, adicionados ao kit |
| Email formatado | Itemização linha a linha + total + filial |
| Saudação automática | Bom dia / Boa tarde / Boa noite pelo horário |

---

## Destinatários fixos

| Campo | Endereço |
|---|---|
| Para | backoffice.comercial @ abix.com.br |
| Cópia | jorge.eduardo @ abix.com.br |

---

## Tabela de preços

Os preços estão embutidos diretamente no arquivo `index.html`.  
Para atualizar, edite o array `CAT` no JavaScript e faça um novo commit.

**Preços fixos** (independentes do catálogo):

| Item | Preço/mês |
|---|---|
| Base carregador | R$ 2,00 |
| Trafo bivolt | R$ 3,00 |

---

## Mapeamento de filiais

| Estado | Filial |
|---|---|
| PR | Matriz |
| SC | Itajaí |
| SP | São Paulo |
| MG | Uberlândia |
| RJ, ES | Niterói |
| BA | Lauro de Freitas |

---

## Histórico de versões

```
feat: cria ferramenta de abertura de CRM em HTML
feat: embute catálogo de 113 produtos com preços da tabela Excel
feat: adiciona busca de rádio com dropdown e autocompletar
feat: monta kit automático ao selecionar rádio
feat: adiciona desconto progressivo por prazo de contrato
feat: define filial automaticamente pelo estado do cliente
feat: gera email formatado com itemização do kit e total
fix:  corrige desalinhamento do corpo do email ao colar no Outlook
feat: publica ferramenta no GitHub Pages
fix:  corrige dropdown de busca não funcionando após publicação
feat: consulta CNPJ automaticamente via BrasilAPI
fix:  corrige cor do badge MEI para vermelho
```

---

## Como atualizar

Veja o arquivo [COMO-ATUALIZAR.md](COMO-ATUALIZAR.md) para o passo a passo completo.

---

## Tecnologias

- HTML + CSS + JavaScript puro — sem frameworks, sem dependências
- [BrasilAPI](https://brasilapi.com.br) — consulta de CNPJ gratuita
- [GitHub Pages](https://pages.github.com) — hospedagem gratuita
