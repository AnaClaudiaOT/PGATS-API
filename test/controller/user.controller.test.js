// Bibliotecas
const request = require("supertest");
const sinon = require("sinon");
const { expect } = require("chai");

// Aplicação
const app = require("../../app");

// Mocks
const transferService = require("../../services/userService");

describe("User Controller", () => {
  describe("POST/USER", () => {
    it("Cadastrando usuário", async () => {
      const resposta = await request(app).post("/users/register").send({
        username: "Fabio",
        password: "Lucas",
        favorecido: true,
      });

      expect(resposta.status).to.equal(201);
      expect(resposta.body).to.have.property("message", "Usuário registrado");
    });

    it("Login de usuário", async () => {
      const resposta = await request(app).post("/users/login").send({
        username: "Fabio",
        password: "Lucas",
        favorecido: true,
      });
      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.have.property(
        "message",
        "Login realizado com sucesso"
      );
    });

    it("Login de usuário inválido", async () => {
      const resposta = await request(app).post("/users/login").send({
        username: "",
        password: "",
        favorecido: true,
      });
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property(
        "error",
        "Informe usuário e senha"
      );
    });
  });
});
