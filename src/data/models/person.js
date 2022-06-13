'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Event, Expense }) {
      Person.belongsTo(Event)
      Person.hasMany(Expense)
      Person.belongsToMany(Expense, { through: "ExpensePerson" })
    }
  }
  Person.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'Person must have a name' },
        notEmpty: { msg: 'name must not be empty' },
      }
    },
  }, {
    sequelize,
    tableName: 'person',
    modelName: 'Person',
  });
  return Person;
};