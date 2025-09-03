const { registerUser, getAllUsers } = require("../services/userService");

exports.register = (req, res) => {
  const { username, password, favorecido } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Informe usuário e senha" });
  const user = registerUser({ username, password, favorecido });
  if (!user) return res.status(409).json({ error: "Usuário já existe" });
  res
    .status(201)
    .json({
      message: "Usuário registrado",
      user: {
        username: user.username,
        favorecido: user.favorecido,
        saldo: user.saldo,
      },
    });
};

exports.getUsers = (req, res) => {
  res.json(
    getAllUsers().map((u) => ({
      username: u.username,
      favorecido: u.favorecido,
      saldo: u.saldo,
    }))
  );
};
