// Bibliotecas
const request = require("supertest");
const sinon = require("sinon");
const { expect } = require("chai");

// Aplicação
const app = require("../../app");

// Mocks
const transferService = require("../../services/transferService");

describe("Transfer Controller", () => {
  describe("POST /transfer", () => {
    it("Quando informo remetente e destinatário invalido recebo 400", async () => {
      const resposta = await request(app).post("/transfer").send({
        from: "Ana",
        to: "Lucas",
        value: 6000,
      });
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property("error", "Usuário não encontrado");
      console.log(resposta.body);
    });

    it("Usando Mocks: Quando informo remetente e destinatário invalido recebo 400", async () => {
      // Mocar apenas a função transfer do Service
      const transferServiceMock = sinon.stub(transferService, "transfer");
      transferServiceMock.throws(new Error("Usuárixxo não encontrado"));

      const resposta = await request(app).post("/transfer").send({
        from: "Ana",
        to: "Lucas",
        value: 6000,
      });
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property("error", "Usuário não encontrado");
      console.log(resposta.body);

      // Reseto o Mock
      sinon.restore();
    });
  });

  describe("GET /transfer", () => {
    it("Quando consulto transferências inexistentes", async () => {
      const resposta = await request(app).get("/transfer").send({
        from: "Ana",
        to: "Lucas",
        value: 6000,
      });
      expect(resposta.status).to.equal(404);
      console.log(resposta.body);
    });
  });
});
