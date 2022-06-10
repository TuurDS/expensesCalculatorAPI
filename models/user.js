'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Posts}) {
      // define association here
      this.hasMany(Posts, {foreignKey: 'userId', as: 'posts'})
    }

    toJSON() {
      return {...this.get(), id: undefined}
    }
  }
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a name'},
        notEmpty: { msg: 'name must not be empty'},
      }
    }, 
    role:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a role'},
        notEmpty: { msg: 'role must not be empty'},
      }
    }
  }, {
    sequelize,
    tableName: 'user',
    modelName: 'User',
  });
  return User;
};