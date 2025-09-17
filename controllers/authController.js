const { login } = require("../services/authService");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../middleware/jwtAuth");

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Informe usuário e senha" });
  const user = login(username, password);
  if (!user) return res.status(401).json({ error: "Login inválido" });
  // Gera JWT
  const token = jwt.sign(
    { username: user.username, favorecido: user.favorecido },
    SECRET,
    { expiresIn: "1h" }
  );
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
