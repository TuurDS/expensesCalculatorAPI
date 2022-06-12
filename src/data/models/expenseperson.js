'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpensePerson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  ExpensePerson.init({
    percentage: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'expensePerson',
    modelName: 'ExpensePerson',
  });
  return ExpensePerson;
};