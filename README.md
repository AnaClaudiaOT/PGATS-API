# API de Transferências e Usuários

API Node.js para login, registro, consulta de usuários e transferências, com autenticação JWT e banco de dados em memória.

## Instalação e Execução

1. Instale as dependências do projeto:

   ```bash
   npm install
   ```

2. Para rodar o servidor REST localmente:

```bash
node server.js
```

3. Para rodar o servidor GraphQL localmente:

```bash
npm run start:graphql
```

## Scripts Úteis

- `npm start` — Inicia o servidor REST
- `npm run start:graphql` — Inicia o servidor GraphQL
- `npm test` — Executa todos os testes automatizados (REST e GraphQL)
- `npm run test-controller-rest` — Executa apenas os testes de controller REST
- `npm run test-external-rest` — Executa apenas os testes de integração/external REST
- `npm run test-controller-graphql` — Executa apenas os testes de controller GraphQL
- `npm run test-external-graphql` — Executa apenas os testes de integração/external GraphQL

## Endpoints Principais

- `POST /users/login` — Login. Envie `{ "username": "...", "password": "..." }`. Retorna um token JWT.
- `POST /users/register` — Cadastro. Envie `{ "username": "...", "password": "...", "favorecido": true|false }`.
- `GET /users` — Lista usuários (requer autenticação JWT).
- `POST /transfer` — Realiza transferência. Envie `{ "from": "...", "to": "...", "value": 100 }` (requer autenticação JWT).
- `GET /transfers` — Lista transferências (requer autenticação JWT).
- `GET /api-docs` — Documentação Swagger interativa.

## Regras de Negócio

- Login exige usuário e senha válidos.
- Não é permitido registrar usuários duplicados.
- Transferências acima de R$ 5.000,00 só para usuários favorecidos.

## Testes Automatizados

### Testes REST

- **Controller (`test/controller/`)**

  - Testam diretamente os controllers da API REST.
  - Cobrem cenários de sucesso, erro de validação, autenticação e regras de negócio.
  - Utilizam mocks (Sinon) para isolar dependências dos services e models.
  - Exemplos: transferência válida, saldo insuficiente, usuário não encontrado.

- **External REST (`test/external-rest/`)**
  - Testam a API REST rodando em um servidor real (end-to-end).
  - Simulam requisições HTTP reais usando Supertest.
  - Testam a integração entre controllers, services e models.
  - Exemplos: login, registro, transferência via endpoint real.

### Testes GraphQL

- **External GraphQL (`test/external-graphql/`)**
  - Testam a API GraphQL rodando em um servidor real.
  - Simulam queries e mutations reais, incluindo autenticação via token JWT.
  - Testam a integração do fluxo GraphQL.
  - Exemplos:
    - Transferência entre usuários válidos
    - Erro ao transferir para usuário inexistente
    - Erro ao transferir valor acima do saldo disponível

### Scripts de Teste

- `npm run test-controller` — Testes unitários/mocados dos controllers REST
- `npm run test-external-rest` — Testes de integração/end-to-end da API REST
- `npm run test-external-graphql` — Testes de integração/end-to-end da API GraphQL

Para rodar todos os testes:

```bash
npm test
```

---

## API GraphQL

A API GraphQL expõe os mesmos serviços da REST, usando Apollo Server v4 e Express.

### Instalação das dependências GraphQL

```bash
npm install @apollo/server@4
```

### Execução da API GraphQL

```bash
npm run start:graphql
```

Acesse a URL http://localhost:4000/graphql.

## Detalhes das Dependências

- **express** — Framework web para rotas e middlewares.
- **jsonwebtoken** — Geração e validação de tokens JWT para autenticação.
- **swagger-ui-express** — Exibe a documentação interativa da API.
- **mocha** — Framework de testes automatizados.
- **chai** — Biblioteca de asserções para testes (expect, assert, should).
- **sinon** — Mocks, spies e stubs para testes isolados.
- **supertest** — Testes de integração HTTP simulando requisições à API.

## Estrutura do Projeto

- `controllers/` — Lógica das rotas (ex: `transferController.js`)
- `services/` — Regras de negócio (ex: `transferService.js`)
- `models/` — Models em memória (`userModel.js`, `transferModel.js`)
- `middleware/` — Middlewares de autenticação e JWT
- `test/` — Testes automatizados e fixtures
- `app.js` — Configuração do Express
- `server.js` — Inicialização do servidor
- `swagger.json` — Documentação da API