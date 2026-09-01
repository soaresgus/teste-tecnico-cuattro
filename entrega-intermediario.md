# Documentação da entrega do teste técnico - Intermediário

## 1. Como usei IA?

> Foi utilizado como ferramenta de IA a IDE com IA integrada **Cursor** em seu plano Pro. O principal modelo foi o proprietário da empresa, o Cursor Grok 4.6 em seu modo High.

A IA foi utilizada principalmente para auxílio em dúvidas, resolução de erros, auto-complete ao digitar código e auxílio na escrita de testes; Segue abaixo as principais etapas onde ela foi utilizada:

- Foram feitas algumas perguntas sobre o processo de autenticação do Firebase.

## 2. Modificações extras realizadas (API)

> Seção para listar modificações extras realizadas na API para cumprir os requisitos básicos do desafio.

-

## 3. Modificações extras realizadas (WEB)

> Seção para listar modificações extras realizadas na API para cumprir com um front-end mínimo para o desafio.

-

## 4. Documentação dos processos de segurança e autenticação

> Seção para listar o passo a passo de como estruturei a segurança da aplicação e o fluxo de autenticação, conforme solicitado.

- Iniciei o processo de autenticação instanciando o emulador de Authentication no `firebase.json`, na porta `9099`.
- Após isso, criei os usuários via seed (`src/seed.ts`), inserindo como **custom claim** o `tenantId` de cada usuário direto no script de seed.
- Agora em toda e qualquer rota que manipule atendimento, a primeira verificação feita é se o usuário está autenticado e se o token é válido.
- Agora, nenhuma rota que manipule o atendimento recebe o `tenantId` no payload, o `tenantId` é retornado a partir do token de autenticação do usuário, logo, ações como atualizar o status do atendimento só é permitido se o `tenantId` que retornar do token corresponder com o registrado no documento do Firestore.

> Caso queira testar, **execute o script de seed**, e os usuários criados (2) serão os seguintes:
admin@tenant-alfa.com / 123456
admin@tenant-beta.com / 123456
