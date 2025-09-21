// Bibliotecas
const request = require("supertest");
const { expect } = require("chai");

// Aplicação
const app = require("../../app");
const userModel = require("../../models/userModel");

describe("Transfer - External", () => {
  describe("POST - transfer", () => {
    let token;

    beforeEach(async () => {
      // Reseta o banco de dados do servidor externo
      await request("http://localhost:3000").post("/__reset__");
      const respostaLogin = await request("http://localhost:3000")
        .post("/users/login")
        .send({
          username: "Ana",
          password: "123456",
        });
      token = respostaLogin.body.token;
    });
    it("Teste no servidor - Quando informo remetente e destinatário invalido recebo 400", async () => {
      // 1) Capturar Token
      const respostaLogin = await request("http://localhost:3000")
        .post("/users/login")
        .send({
          username: "Ana",
          password: "123456",
        });

      const token = respostaLogin.body.token;

      const resposta = await request("http://localhost:3000")
        .post("/transfer")
        .set("Authorization", `Bearer ${token}`)
        .send({
          from: "Ana",
          to: "João",
          value: 6000,
        });
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property("error", "Usuário não encontrado");
    });

    it("Quando informo valores válidos eu tenho sucesso com 201 CREATED", async () => {
      const resposta = await request("http://localhost:3000")
        .post("/transfer")
        .set("Authorization", `Bearer ${token}`)
        .send({
          from: "Ana",
          to: "Lucas",
          value: 100,
        });

      console.log(resposta.body);
      expect(resposta.status).to.equal(201);
      expect(resposta.body).to.have.property("from", "Ana");
      expect(resposta.body).to.have.property("to", "Lucas");
      expect(resposta.body).to.have.property("value", 100);
    });

    it("Validação com Json: Quando valores válidos eu tenho sucesso com 201 CREATED", async () => {
      const resposta = await request("http://localhost:3000")
        .post("/transfer")
        .set("Authorization", `Bearer ${token}`)
        .send({
          from: "Ana",
          to: "Lucas",
          value: 6000,
        });

      expect(resposta.status).to.equal(201);

      // Implementando validação através do arquivo json
      const respostaEsperada = require("../fixtures/respostas/compare.json");
      delete resposta.body.date;
      delete respostaEsperada.date;

      // Somente um expect para comparar a resposta.body com a String contida no arquivo compare.json
      expect(resposta.body).to.eql(respostaEsperada);
    });
  });
});
