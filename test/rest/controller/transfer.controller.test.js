// Bibliotecas
const request = require("supertest");
const sinon = require("sinon");
const { expect } = require("chai");

// Aplicação
const app = require("../../../app");

// Mocks
const transferService = require("../../../services/transferService");

describe("Testes de Transferências - Controller", () => {
  let token;

  beforeEach(async () => {
    // Realiza login e armazena o token para cada teste
    const respostaLogin = await request(app).post("/users/login").send({
      username: "Ana",
      password: "123456",
    });
    token = respostaLogin.body.token;
  });

  describe("Validações de Transferências", () => {
    it("Quando informo remetente e destinatário invalido recebo 400", async () => {
      const resposta = await request(app)
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

    it("Usando Mocks: Quando informo remetente e destinatário invalido recebo 400", async () => {
      // Mocar apenas a função transfer do Service
      const transferServiceMock = sinon.stub(transferService, "transfer");
      transferServiceMock.throws(new Error("Usuário não encontrado"));

      const resposta = await request(app)
        .post("/transfer")
        .set("Authorization", `Bearer ${token}`)
        .send({
          from: "Ana",
          to: "João",
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

      const resposta = await request(app)
        .post("/transfer")
        .set("Authorization", `Bearer ${token}`)
        .send({
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

    it("Usando Mocks - Validação com Json: Quando valores válidos eu tenho sucesso com 201 CREATED", async () => {
      // Preparando os Dados
      // Carregar o arquivo compare.json
      // Preparar a forma de ignorar os campos dinamicos

      // Mocar apenas a função transfer do Service
      const transferServiceMock = sinon.stub(transferService, "transfer");
      transferServiceMock.returns({
        from: "Ana",
        to: "Lucas",
        value: 6000,
        date: new Date(),
      });

      const resposta = await request(app)
        .post("/transfer")
        .set("Authorization", `Bearer ${token}`)
        .send({
          from: "Ana",
          to: "Lucas",
          value: 6000,
        });

      expect(resposta.status).to.equal(201);

      // Implementando validação através do arquivo json
      const respostaEsperada = require("../../rest/fixtures/respostas/compare.json");
      delete resposta.body.date;
      delete respostaEsperada.date;

      // Somente um expect para comparar a resposta.body com a String contida no arquivo compare.json
      expect(resposta.body).to.eql(respostaEsperada);

      // Reseto o Mock
      sinon.restore();
    });

    it("Não permite transferência acima de 5.000 para não favorecido", async () => {
      await request(app).post("/users/register").send({
        username: "NaoFavorecido",
        password: "123456",
        favorecido: false,
      });

      const respostaLogin = await request(app).post("/users/login").send({
        username: "Ana",
        password: "123456",
      });
      const token = respostaLogin.body.token;

      const resposta = await request(app)
        .post("/transfer")
        .set("Authorization", `Bearer ${token}`)
        .send({
          from: "Ana",
          to: "NaoFavorecido",
          value: 6000,
        });
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property(
        "error",
        "Transferência acima de R$ 5.000,00 só para favorecidos"
      );
    });
  });

  describe("Busca de Transferências", () => {
    it("Quando consulto transferências inexistentes", async () => {
      const resposta = await request(app)
        .get("/transfers")
        .set("Authorization", `Bearer ${token}`)
        .send({
          from: "Ana",
          to: "Lucas",
          value: 100,
        });
      expect(resposta.status).to.equal(404);
      expect(resposta.body).to.have.property(
        "error",
        "Nenhuma transferência encontrada"
      );
    });
  });
});
