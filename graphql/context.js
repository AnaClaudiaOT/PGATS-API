const jwt = require("jsonwebtoken");
const { SECRET } = require("../middleware/jwtAuth");

module.exports = ({ req }) => {
  const auth = req.headers.authorization || "";
  if (auth.startsWith("Bearer ")) {
    try {
      const token = auth.replace("Bearer ", "");
      const user = jwt.verify(token, SECRET);
      return { user };
    } catch (e) {
      return {};
    }
  }
  return {};
};
