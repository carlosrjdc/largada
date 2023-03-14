const express = require("express");
const cors = require("cors");
const carregarArquivo = require("./carregarArquivo/carregarArquivo.js");
const escala = require("./escala.js");
const escalaEmMassa = require("./escalaEmMassa.js");
const contagem = require("./estoque.js");

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ Titulo: "Carlos Roberto" });
  });

  app.use(
    express.json(),
    cors(),
    carregarArquivo,
    escala,
    contagem,
    escalaEmMassa,

    express.raw({ type: "application/pdf" })
  );
};

module.exports = routes;
