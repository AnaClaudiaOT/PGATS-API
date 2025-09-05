# API de Transferências e Usuários

Esta API permite realizar login, registro de usuários, consulta de usuários e transferências de valores, com regras básicas de negócio. O banco de dados é em memória.

## Instalação

1. Instale as dependências:

   ```powershell
   npm install express swagger-ui-express
   ```

2. Para rodar o servidor:
   ```powershell
   node server.js
   ```

## Endpoints

- `POST /users/login`: Realiza login. Envie `{ "username": "...", "password": "..." }`.
- `POST /users/register`: Registra usuário. Envie `{ "username": "...", "password": "...", "favorecido": true|false }`.
- `GET /users`: Lista todos os usuários.
- `POST /transfer`: Realiza transferência. Envie `{ "from": "...", "to": "...", "value": 100 }`.
- `GET /transfers`: Lista todas as transferências.
- `GET /api-docs`: Documentação Swagger interativa.

## Regras de Negócio

- Login exige usuário e senha.
- Não é permitido registrar usuários duplicados.
- Transferências acima de R$ 5.000,00 só podem ser feitas para usuários favorecidos.

## Testes

Para testes automatizados, importe o `app.js` em seu script de testes (ex: com Supertest).

## Estrutura

- `controllers/`: Lógica das rotas
- `services/`: Regras de negócio
- `models/`: Models em memória (`userModel.js`, `transferModel.js`)
- `middleware/`: Middleware de autenticação
- `app.js`: Configuração da aplicação
- `server.js`: Inicialização do servidor
- `swagger.json`: Documentação da API

---

API criada para fins de aprendizado de testes e automação.
