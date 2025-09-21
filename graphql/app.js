const express = require("express");
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServer } = require("@apollo/server");
const cors = require("cors");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const context = require("./context");

const app = express();
app.use(express.json());
app.use(cors());

async function startApollo() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  app.use("/graphql", expressMiddleware(server, { context }));
}

startApollo();

module.exports = app;
