// Banco de dados em memória
let users = [];

function reset() {
  users = [
    {
      username: "Ana",
      password: "123456",
      favorecido: true,
      saldo: 10000,
    },
    {
      username: "Lucas",
      password: "123456",
      favorecido: true,
      saldo: 10000,
    },
  ];
}

// Inicializa ao carregar o módulo
reset();

function findByUsername(username) {
  return users.find((u) => u.username === username);
}

function add(user) {
  users.push(user);
}

function getAll() {
  return users;
}

module.exports = {
  findByUsername,
  add,
  getAll,
};
