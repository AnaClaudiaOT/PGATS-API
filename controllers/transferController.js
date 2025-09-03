const { transfer, getAllTransfers } = require("../services/transferService");

exports.transfer = (req, res) => {
  const { from, to, value } = req.body;
  if (!from || !to || typeof value !== "number")
    return res.status(400).json({ error: "Dados inválidos" });
  const result = transfer(from, to, value);
  if (result.error) return res.status(400).json(result);
  res.json({ message: "Transferência realizada com sucesso" });
};

exports.getTransfers = (req, res) => {
  res.json(getAllTransfers());
};
