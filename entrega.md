# Documentação da entrega do teste técnico

## 1. Como usei IA?
> Foi utilizado como ferramenta de IA a IDE com IA integrada **Cursor** em seu plano Pro. O principal modelo foi o proprietário da empresa, o Cursor Grok 4.6 em seu modo High.

A IA foi utilizada principalmente para auxílio em dúvidas, resolução de erros e auto-complete ao digitar código, segue abaixo as principais etapas onde ela foi utilizada:

- Inicialmente ao tentar rodar o seed ocorreu um erro de execução relacionado ao Firebase, considerando que executei o comando da forma que foi instruído e que o Firebase já estava rodando localmente e mesmo assim o comando retornou erro, utilizei o auxílio do Cursor em seu modo Ask. A dúvida em relação ao erro foi sanada e consegui corrigir rapidamente o problema.

- Outra dúvida que foi retirada no modo Ask, foi se era valido utilizar validação de schema de body usando Zod quando se trata de Cloud Functions. Como a resposta foi positiva e coerente, prossegui com a implementação.

## 2. Principais modificações realizadas (API)
- Apliquei validação de schema de body das requisições usando a biblioteca Zod, para assim garantir uma camada extra de segurança antes mesmo que o erro ocorra no front-end.
