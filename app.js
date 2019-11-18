const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");
const { handleCustomErrors } = require("./error-handler/error-handler");

app.use(express.json());
app.use("/api", apiRouter);
app.use(handleCustomErrors);

module.exports = app;
