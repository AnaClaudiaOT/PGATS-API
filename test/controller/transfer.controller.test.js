// Bibliotecas
const request = require("supertest");
const sinon = require("sinon");
const { expect } = require("chai");

// Aplicação
const app = require("../../app");

describe("Transfer Controller", () => {
  describe("POST /transfer", () => {
    it("Quando informo remetente e destinatário invalido recebo 400", async () => {
      const resposta = await request(app).post("/transfer").send({
        from: "Ana",
        to: "Lucas",
        value: 6000,
      });
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error','Usuário não encontrado')
      console.log(resposta.body);
    });
  });
});

