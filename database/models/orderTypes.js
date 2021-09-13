const { Sequelize, DataTypes } = require('sequelize');

function createOrderTypeModel(connection) {
  const OrderType = connection.define('OrderType', {
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
  return OrderType;
}



module.exports = {
  createOrderTypeModel
}