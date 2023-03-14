const express = require("express");
const cors = require("cors");
const carregarArquivo = require("./carregarArquivo/carregarArquivo.js");
const escala = require("./escala.js");
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

    express.raw({ type: "application/pdf" })
  );
};

module.exports = routes;
