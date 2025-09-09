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
    res.json({ message: "Transferência realizada com sucesso" });
  } catch (err) {
    // Retorna erro 400 com mensagem do erro lançado, se existir
    res.status(400).json({ error: err.message || "Erro inesperado" });
  }
};

exports.getTransfers = (req, res) => {
  res.json(getAllTransfers());
};
