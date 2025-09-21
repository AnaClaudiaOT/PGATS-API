const request = require("supertest");
const { expect } = require("chai");

describe("Testes de Transferências - GraphQL", () => {
  beforeEach(async () => {
    const resposta = await request("http://localhost:4000/graphql")
      .post("")
      .send({
        query: `
            mutation Login($username: String!, $password: String!) {
             login(username: $username, password: $password) {
                  token
                  user {
                   username
                }
              }
         }`,
        variables: {
          username: "Ana",
          password: "123456",
        },
      });
    token = resposta.body.data.login.token;
  });

  it("Validar transferência entre usuários válidos", async () => {
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
          value: 100,
        },
      });
    console.log(respostaTransferencia.status);
    expect(respostaTransferencia.status).to.equal(200);
  });

  it("Validar erro ao transferir para usuário inexistente", async () => {
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
          to: "João",
          value: 10,
        },
      });
    expect(respostaTransferencia.body).to.have.property("errors");
    expect(respostaTransferencia.body.errors[0].message).to.include(
      "Usuário não encontrado"
    );
  });

  it("Validar erro ao transferir valor acima do saldo", async () => {
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
