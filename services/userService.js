const userModel = require("../models/userModel");

function findUserByUsername(username) {
  return userModel.findByUsername(username);
}

function registerUser({ username, password, favorecido }) {
  if (findUserByUsername(username)) return null;
  const user = { username, password, favorecido: !!favorecido, saldo: 10000 };
  userModel.add(user);
  return user;
}

function getAllUsers() {
  return userModel.getAll();
}

module.exports = { findUserByUsername, registerUser, getAllUsers };
