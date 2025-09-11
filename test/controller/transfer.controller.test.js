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
    });

    it("Usando Mocks: Quando informo remetente e destinatário invalido recebo 400", async () => {
      // Mocar apenas a função transfer do Service
      const transferServiceMock = sinon.stub(transferService, "transfer");
      transferServiceMock.throws(new Error("Usuário não encontrado"));

      const resposta = await request(app).post("/transfer").send({
        from: "Ana",
        to: "Lucas",
        value: 6000,
      });
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property("error", "Usuário não encontrado");
      // Reseto o Mock
      sinon.restore();
    });

    it("Usando Mocks: Quando valores válidos eu tenho sucesso com 201 CREATED", async () => {
      // Mocar apenas a função transfer do Service
      const transferServiceMock = sinon.stub(transferService, "transfer");
      transferServiceMock.returns({
        from: "Ana",
        to: "Lucas",
        value: 6000,
        date: new Date(),
      });

      const resposta = await request(app).post("/transfer").send({
        from: "Ana",
        to: "Lucas",
        value: 6000,
      });
      expect(resposta.status).to.equal(201);
      expect(resposta.body).to.have.property("from", "Ana");
      expect(resposta.body).to.have.property("to", "Lucas");
      expect(resposta.body).to.have.property("value", 6000);

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
    });
  });
});
