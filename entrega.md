# Documentação da entrega do teste técnico

## 1. Como usei IA?
> Foi utilizado como ferramenta de IA a IDE com IA integrada **Cursor** em seu plano Pro. O principal modelo foi o proprietário da empresa, o Cursor Grok 4.6 em seu modo High.

A IA foi utilizada principalmente para auxílio em dúvidas, resolução de erros, auto-complete ao digitar código e auxílio na escrita de testes; Segue abaixo as principais etapas onde ela foi utilizada:

- Inicialmente ao tentar rodar o seed ocorreu um erro de execução relacionado ao Firebase, considerando que executei o comando da forma que foi instruído e que o Firebase já estava rodando localmente e mesmo assim o comando retornou erro, utilizei o auxílio do Cursor em seu modo Ask. A dúvida em relação ao erro foi sanada e consegui corrigir rapidamente o problema.

- Outra dúvida que foi retirada no modo Ask, foi se era valido utilizar validação de schema de body usando Zod quando se trata de Cloud Functions e considerando o escopo do projeto. Como a resposta foi positiva e coerente, prossegui com a implementação.

- Foi também retirado algumas dúvidas em relação a melhores práticas de testes quando se está trabalhando com Firestore.

- Por fim, realizei algumas perguntas se algumas bibliotecas no front-end valiam a pena serem usada considerando o escopo e o prazo do projeto.

## 2. Modificações extras realizadas (API)
> Seção para listar modificações extras realizadas na API para cumprir os requisitos básicos do desafio

- Apliquei validação de schema de body das requisições usando a biblioteca Zod, para assim garantir uma camada extra de segurança antes mesmo que o erro ocorra no front-end.

## 3. Modificações extras realizadas (WEB)
> Seção para listar modificações extras realizadas na API para cumprir com um front-end mínimo para o desafio

- Instalado e configurado TailwindCSS para facilitar e agilizar o processo de estilização.

- Instalado e configurado o React Query para ter um melhor controle de estado e de requisições das Functions.
