// Middleware de autenticação simples (token em memória)
const tokens = new Set();

function generateToken(username) {
  // Token simples: username + timestamp
  const token = Buffer.from(username + Date.now()).toString("base64");
  tokens.add(token);
  return token;
}

function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !tokens.has(authHeader)) {
    return res.status(401).json({ error: "Token inválido ou ausente" });
  }
  next();
}

module.exports = { generateToken, authenticate, tokens };
