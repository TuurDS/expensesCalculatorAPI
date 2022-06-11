'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Person }) {
      Event.belongsTo(User)
      Event.hasMany(Person)
    }
  }
  Event.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Event must have a name' },
        notEmpty: { msg: 'name must not be empty' },
      }
    },
  }, {
    sequelize,
    tableName: 'event',
    modelName: 'Event',
  });
  return Event;
};