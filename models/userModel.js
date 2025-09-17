// Banco de dados em memória
const users = [
  {
    username: "Ana",
    password: "123456",
    favorecido: true,
    saldo: 10000,
  },
];

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
