const { findUserByUsername } = require("./userService");

function login(username, password) {
  const user = findUserByUsername(username);
  if (!user || user.password !== password) return null;
  return user;
}

module.exports = { login };
