const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const authController = require("./controllers/authController");
const userController = require("./controllers/userController");
const transferController = require("./controllers/transferController");

const { authenticateJWT } = require("./middleware/jwtAuth");

const app = express();
app.use(express.json());

app.post("/users/login", authController.login);
app.post("/users/register", userController.register);
app.get("/users", userController.getUsers);
app.post("/transfer", authenticateJWT, transferController.transfer);
app.get("/transfers", authenticateJWT, transferController.getTransfers);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
