const db = require("../models");
require("dotenv").config();
const excelToJson = require("convert-excel-to-json");
const { Op } = require("sequelize");

const escala = db.Escala;

class escalaController {
  //CADASTRO DE USUARIO
  static deletarregistros = async (req, res) => {
    try {
      const registro = await escala.destroy({
        where: {},
        truncate: true,
      });
      res.status(200).json("registro deletados");
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static UploadEscala = async (req, res) => {
    const result = excelToJson({
      source: req.file.buffer,
      columnToKey: {
        A: "NRota",
        B: "Placa",
        C: "Transporte",
        D: "Nf",
        E: "Cliente",
        F: "Cidade",
        Q: "Bairro",
        H: "Qtdentregas",
        I: "Reentrega",
        J: "LDB",
        K: "ITB",
      },
      sheets: "base",
    });

    result.base.shift();

    try {
      const cadastroEmMassa = await escala.bulkCreate(result.base);
      res.status(200).json(cadastroEmMassa);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
}

module.exports = escalaController;
