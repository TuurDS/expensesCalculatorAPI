'use strict';
const { Model } = require('sequelize');
const SplitTypes = require('../splitTypes');

module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Event, Person }) {
      Expense.belongsTo(Event)
      Expense.belongsTo(Person)
      Expense.belongsToMany(Person, { through: "ExpensePerson" })
    }
  }
  Expense.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Expense must have a description' },
        notEmpty: { msg: 'description must not be empty' },
      }
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: { msg: 'Expense must have an amount' },
        notEmpty: { msg: 'amount must not be empty' },
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'Expense must have a date' },
        notEmpty: { msg: 'date must not be empty' },
      }
    },
    splitType: {
      type: DataTypes.ENUM(Object.values(SplitTypes)),
      allowNull: false,
      validate: {
        notNull: { msg: 'Expense must have a splitType' },
        notEmpty: { msg: 'splitType must not be empty' },
      }
    },
  }, {
    sequelize,
    tableName: 'expense',
    modelName: 'Expense',
  });
  return Expense;
};