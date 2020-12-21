'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Client.init({
    name: DataTypes.STRING,
    age: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    account_number: DataTypes.STRING,
    balance: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Client'
  })

  Client.associate = (models) => {
    Client.hasMany(models.Transaction, {
      foreignKey: 'clientId'
    })
  }
  return Client
}
