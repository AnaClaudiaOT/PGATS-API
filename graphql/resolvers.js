const userService = require("../services/userService");
const transferService = require("../services/transferService");
const authService = require("../services/authService");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../middleware/jwtAuth");

const resolvers = {
  Query: {
    users: () => userService.getAllUsers(),
    transfers: (parent, args, context) => {
      if (!context.user) throw new Error("Não autenticado");
      return transferService.getAllTransfers();
    },
  },
  Mutation: {
    register: (parent, { username, password, favorecido }) => {
      const user = userService.registerUser({ username, password, favorecido });
      if (!user) throw new Error("Usuário já existe");
      return user;
    },
    login: (parent, { username, password }) => {
      const user = authService.login(username, password);
      if (!user) throw new Error("Login inválido");
      const token = jwt.sign(
        { username: user.username, favorecido: user.favorecido },
        SECRET,
        { expiresIn: "1h" }
      );
      return { token, user };
    },
    transfer: (parent, { from, to, value }, context) => {
      if (!context.user) throw new Error("Não autenticado");
      const result = transferService.transfer(from, to, value);
      if (result && result.error) throw new Error(result.error);
      return result;
    },
  },
};

module.exports = resolvers;
