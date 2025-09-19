const userModel = require("../models/userModel");
const transferModel = require("../models/transferModel");

function transfer(from, to, value) {
  const sender = userModel.findByUsername(from);
  const recipient = userModel.findByUsername(to);
  if (!sender || !recipient) return { error: "Usuário não encontrado" };
  if (sender.saldo < value) return { error: "Saldo insuficiente" };
  if (!recipient.favorecido && value >= 5000) {
    return { error: "Transferência acima de R$ 5.000,00 só para favorecidos" };
  }
  sender.saldo -= value;
  recipient.saldo += value;
  const transferencia = { from, to, value, date: new Date() };
  transferModel.add(transferencia);
  return transferencia;
}

function getAllTransfers() {
  return transferModel.getAll();
}

module.exports = { transfer, getAllTransfers };
