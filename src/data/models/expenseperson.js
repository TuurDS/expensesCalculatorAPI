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
      allowNull: false,
      validate: {
        notNull: { msg: 'ExpensePerson must have a percentage' },
        notEmpty: { msg: 'percentage must not be empty' },
      }
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: { msg: 'ExpensePerson must have an amount' },
        notEmpty: { msg: 'amount must not be empty' },
      }
    },
  }, {
    sequelize,
    tableName: 'expensePerson',
    modelName: 'ExpensePerson',
  });
  return ExpensePerson;
};