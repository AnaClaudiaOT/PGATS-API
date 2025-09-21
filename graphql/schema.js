const { gql } = require("graphql-tag");

const typeDefs = gql`
  type User {
    username: String!
    favorecido: Boolean!
    saldo: Float!
  }

  type Transfer {
    from: String!
    to: String!
    value: Float!
    date: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users: [User!]!
    transfers: [Transfer!]!
  }

  type Mutation {
    register(username: String!, password: String!, favorecido: Boolean): User!
    login(username: String!, password: String!): AuthPayload!
    transfer(from: String!, to: String!, value: Float!): Transfer!
  }
`;

module.exports = typeDefs;
