// Banco de dados em memória
const transfers = [];

function add(transfer) {
  transfers.push(transfer);
}

function getAll() {
  return transfers;
}

module.exports = {
  add,
  getAll,
};
