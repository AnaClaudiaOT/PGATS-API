// Bibliotecas
const request = require("supertest");
const { expect } = require("chai");

// Aplicação
const app = require("../../app");

describe("Transfer - External", () => {
  describe("POST /transfer", () => {
    it("Teste no servidor - Quando informo remetente e destinatário invalido recebo 400", async () => {
      const resposta = await request("http://localhost:3000")
        .post("/transfer")
        .send({
          from: "Ana",
          to: "Lucas",
          value: 6000,
        });
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property("error", "Usuário não encontrado");
    });
  });
});