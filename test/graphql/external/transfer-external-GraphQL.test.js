const request = require("supertest");
const { expect } = require("chai");

describe("Testes de Transferências - GraphQL", () => {
  beforeEach(async () => {
    const loginUser = require("../fixtures/requisicoes/login/loginUser.json");
    const resposta = await request("http://localhost:4000/graphql")
      .post("")
      .send(loginUser);
    token = resposta.body.data.login.token;
  });

  it("Validar transferência entre usuários válidos", async () => {
    const createTransfer = require("../fixtures/requisicoes/transferencia/transfer.json");
    const respostaTransferencia = await request("http://localhost:4000/graphql")
      .post("")
      .set("Authorization", `Bearer ${token}`)
      .send(createTransfer);
    expect(respostaTransferencia.status).to.equal(200);
    expect(respostaTransferencia.body.data.transfer).to.have.property(
      "from",
      "Ana"
    );
    expect(respostaTransferencia.body.data.transfer).to.have.property(
      "to",
      "Lucas"
    );
    expect(respostaTransferencia.body.data.transfer).to.have.property(
      "value",
      100
    );
  });

  it("Validar erro ao transferir para usuário inexistente", async () => {
    const createTransfer = require("../fixtures/requisicoes/transferencia/transfer.json");
    createTransfer.variables.to = "João";
    const respostaTransferencia = await request("http://localhost:4000/graphql")
      .post("")
      .set("Authorization", `Bearer ${token}`)
      .send(createTransfer);
    expect(respostaTransferencia.body).to.have.property("errors");
    expect(respostaTransferencia.body.errors[0].message).to.include(
      "Usuário não encontrado"
    );
  });

  it("Validar erro ao transferir valor acima do saldo", async () => {
    const createTransfer = require("../fixtures/requisicoes/transferencia/transfer.json");
    createTransfer.variables.value = 50000;
    const respostaTransferencia = await request("http://localhost:4000/graphql")
      .post("")
      .set("Authorization", `Bearer ${token}`)
      .send({
        query: `mutation Transfer($from: String!, $to: String!, $value: Float!) {
                    transfer(from: $from, to: $to, value: $value) {
                        date
                        from
                        to
                        value
                    }
                }`,
        variables: {
          from: "Ana",
          to: "Lucas",
          value: 50000,
        },
      });

    expect(respostaTransferencia.body).to.have.property("errors");
    expect(respostaTransferencia.body.errors[0].message).to.include(
      "Saldo insuficiente"
    );
  });
});
