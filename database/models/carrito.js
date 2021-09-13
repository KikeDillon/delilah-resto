const { Sequelize, DataTypes } = require('sequelize');

function createCarritoModel(connection) {
  const Carrito = connection.define('Carrito', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    totalProducts: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalPay: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    paymentType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idAddress: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
    cartConfirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    orderType: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
  });
return Carrito;
}



module.exports = {
  createCarritoModel
}