const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");
const {
  handleCustomErrors,
  handlePSQLErrors,
  handleServerErrors
} = require("./error-handler/error-handler");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);
app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleServerErrors);

module.exports = app;
