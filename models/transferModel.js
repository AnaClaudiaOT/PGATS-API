// Banco de dados em memória
let transfers = [];

function reset() {
  transfers = [];
}

function add(transfer) {
  transfers.push(transfer);
}

function getAll() {
  return transfers;
}

module.exports = {
  add,
  getAll,
  reset,
};
