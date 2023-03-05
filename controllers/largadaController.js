const db = require("../models");
require("dotenv").config();

const verescala = db.Escala;


class largadaController {
  //CADASTRO DE USUARIO
  static deletarregistros = async (req, res) => {
    try {
      const registro = await verescala.destroy({
        where: {},
        truncate: true
      });
      res.status(200).json("registro deletados");
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static atualizarDados = async (req, res) => {
    try {
      const registro = await verescala.update(
        req.body,{
        where: {id:req.params.id},
      });
      res.status(200).json("registro deletados");
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static buscarRegistros = async (req, res) => {
    try {
      const registro = await verescala.findAll();
      res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

}

module.exports = largadaController;
