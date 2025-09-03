const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const authController = require("./controllers/authController");
const userController = require("./controllers/userController");
const transferController = require("./controllers/transferController");
const { authenticate } = require("./middleware/authMiddleware");

const app = express();
app.use(express.json());

app.post("/users/login", authController.login);
app.post("/users/register", userController.register);
app.get("/users", authenticate, userController.getUsers);
app.post("/transfer", authenticate, transferController.transfer);
app.get("/transfers", authenticate, transferController.getTransfers);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
