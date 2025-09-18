const { transfer, getAllTransfers } = require("../services/transferService");

exports.transfer = (req, res) => {
  try {
    const { from, to, value } = req.body;
    if (!from || !to || typeof value !== "number")
      return res.status(400).json({ error: "Dados inválidos" });
    const result = require("../services/transferService").transfer(
      from,
      to,
      value
    );
    if (result && result.error) return res.status(400).json(result);
    res.status(201).json(result);
  } catch (err) {
    // Retorna erro 400 com mensagem do erro lançado, se existir
    res.status(400).json({ error: err.message || "Erro inesperado" });
  }
};

exports.getTransfers = (req, res) => {
  const transfers = getAllTransfers();
  if (!transfers || transfers.length === 0) {
    return res.status(404).json({ error: "Nenhuma transferência encontrada" });
  }
  res.json(transfers);
};
