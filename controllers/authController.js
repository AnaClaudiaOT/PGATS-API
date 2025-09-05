const { login } = require("../services/authService");
const { generateToken } = require("../middleware/authMiddleware");

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Informe usuário e senha" });
  const user = login(username, password);
  if (!user) return res.status(401).json({ error: "Login inválido" });
  const token = generateToken(user.username);
  res.json({
    message: "Login realizado com sucesso",
    token,
    user: {
      username: user.username,
      favorecido: user.favorecido,
      saldo: user.saldo,
    },
  });
};
