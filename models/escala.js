"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Escala extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Escala.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      NRota: {
        unique: true,
        type: Sequelize.STRING,
      },
      Placa: {
        type: Sequelize.STRING,
      },
      Transporte: {
        type: Sequelize.STRING,
      },
      Nf: {
        type: Sequelize.STRING,
      },
      Cliente: {
        type: Sequelize.STRING,
      },
      Cidade: {
        type: Sequelize.STRING,
      },
      Bairro: {
        type: Sequelize.STRING,
      },
      Qtdentregas: {
        type: Sequelize.INTEGER,
      },
      Reentrega: {
        type: Sequelize.INTEGER,
      },
      LDB: {
        type: Sequelize.INTEGER,
      },
      ITB: {
        type: Sequelize.INTEGER,
      },
      inicioSeparacao: {
        type: Sequelize.DATE,
      },
      fimSeparacao: {
        type: Sequelize.DATE,
      },
      inicioCarregamento: {
        type: Sequelize.DATE,
      },
      fimCarregamento: {
        type: Sequelize.DATE,
      },
      cargaparada: {
        type: Sequelize.STRING,
      },
      obs: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "Escala",
    }
  );
  return Escala;
};
