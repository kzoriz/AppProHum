'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Avaliacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
    }
  }
  Avaliacao.init({
    avaliacao: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    alunoId: DataTypes.INTEGER,
    data_inicio: DataTypes.DATE,
    data_fim: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Avaliacao',
  });
  return Avaliacao;
};
