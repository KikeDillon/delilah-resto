const { Sequelize, DataTypes } = require('sequelize');

function createPaymentTypeModel(connection) {
  const PaymentType = connection.define('PaymentType', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });
  return PaymentType;
}



module.exports = {
  createPaymentTypeModel
}