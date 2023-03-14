'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estoque extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Estoque.init({
    endereco: DataTypes.STRING,
    sku: DataTypes.STRING,
    skuantigo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    lote: DataTypes.STRING,
    unidads: DataTypes.INTEGER,
    datafab: DataTypes.STRING,
    dataval: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Estoque',
  });
  return Estoque;
};