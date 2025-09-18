# API de Transferências e Usuários

API Node.js para login, registro, consulta de usuários e transferências, com autenticação JWT e banco de dados em memória. Ideal para aprendizado de testes automatizados e arquitetura Express.

## Instalação e Execução

1. Instale as dependências do projeto:

   ```bash
   npm install
   ```

2. Para rodar o servidor localmente:
   ```bash
   node server.js
   ```

## Scripts Úteis

- `npm start` — Inicia o servidor (se configurado no package.json)
- `npm test` — Executa todos os testes automatizados
- `npm run test-controller` — Executa apenas os testes de controller

## Endpoints Principais

- `POST /users/login` — Login. Envie `{ "username": "...", "password": "..." }`. Retorna um token JWT.
- `POST /users/register` — Cadastro. Envie `{ "username": "...", "password": "...", "favorecido": true|false }`.
- `GET /users` — Lista usuários (requer autenticação JWT).
- `POST /transfer` — Realiza transferência. Envie `{ "from": "...", "to": "...", "value": 100 }` (requer autenticação JWT).
- `GET /transfers` — Lista transferências (requer autenticação JWT).
- `GET /api-docs` — Documentação Swagger interativa.

### Exemplo de uso com autenticação

1. Faça login para obter o token:
   ```json
   POST /users/login
   {
     "username": "Ana",
     "password": "123456"
   }
   // resposta: { "token": "..." }
   ```
2. Use o token nas rotas protegidas:
   ```http
   Authorization: Bearer <token>
   ```

## Regras de Negócio

- Login exige usuário e senha válidos.
- Não é permitido registrar usuários duplicados.
- Transferências acima de R$ 5.000,00 só para usuários favorecidos.

## Testes Automatizados

- Os testes utilizam Supertest, Chai e Sinon para mocks.
- O arquivo `test/controller/transfer.controller.test.js` cobre cenários de sucesso, erro e autenticação.
- Antes de cada teste, é feito login e o token JWT é usado nas requisições protegidas.
- Para rodar todos os testes:
  ```bash
  npm test
  ```
- Para rodar apenas os testes de controller:
  ```bash
  npm run test-controller
  ```

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

---

API criada para fins de aprendizado de testes, autenticação e automação com Node.js.
