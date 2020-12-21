'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  };
  Transaction.init({
    type: DataTypes.STRING,
    value: DataTypes.NUMBER,
    oldBalance: DataTypes.NUMBER,
    newBalance: DataTypes.NUMBER,
    to: DataTypes.STRING,
    from: DataTypes.STRING,
    clientId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction'
  })
  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Client, {
      foreignKey: 'clientId',
      onDelete: 'CASCADE'
    })
  }
  return Transaction
}
