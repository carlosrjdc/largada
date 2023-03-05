const db = require("../models");
require("dotenv").config();
const { Op } = require("sequelize");

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
  static estatistica = async (req, res) => {
    try {
      const aSeparar = await verescala.count({
        where:{
            inicioSeparacao:{
            [Op.is]:null
        }
        }
      });
      const emSeparacao = await verescala.count({
        where:{
            inicioSeparacao:{
            [Op.ne]:null
        }
        }
      });
      const AConfererir = await verescala.count({
        where:{
            fimSeparacao:{
            [Op.ne]:null
        }
        }
      });
      const EmConferencia = await verescala.count({
        where:{
            inicioCarregamento:{
            [Op.ne]:null
        }
        }
      });
      const Carregado = await verescala.count({
        where:{
            fimCarregamento:{
            [Op.ne]:null
        }
        }
      });
      res.status(200).json({"ASeparar": aSeparar, "EmSeparação": emSeparacao, "AConferior":AConfererir, "EmConferencia":EmConferencia,"Carregado":Carregado});
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

}

module.exports = largadaController;
