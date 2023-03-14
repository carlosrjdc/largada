const db = require("../models");
require("dotenv").config();
const excelToJson = require("convert-excel-to-json");
const { Op } = require("sequelize");

const estoque = db.Estoque;

class largadaController {
  //CADASTRO DE USUARIO
  static deletarregistros = async (req, res) => {
    try {
      const registro = await estoque.destroy({
        where: {},
        truncate: true,
      });
      res.status(200).json("registro deletados");
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static carregarRegistros = async (req, res) => {
    const registro = await estoque.findAll();
    try {
      res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
  static UploadContagem = async (req, res) => {
    const result = excelToJson({
      source: req.file.buffer,
      columnToKey: {
        A: "endereco",
        B: "sku",
        C: "skuantigo",
        D: "descricao",
        E: "lote",
        F: "unidads",
        G: "datafab",
        H: "dataval",
        I: "status",
      },
      sheets: "base",
    });

    result.base.shift();

    try {
      const cadastroEmMassa = await estoque.bulkCreate(result.base);
      res.status(200).json(cadastroEmMassa);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
}

module.exports = largadaController;
