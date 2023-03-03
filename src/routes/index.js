const express = require("express");
const cors = require("cors");

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ Titulo: "Carlos Roberto" });
  });

  app.use(
    express.json(),
    cors(),

    express.raw({ type: "application/pdf" })
  );
};

module.exports = routes;
