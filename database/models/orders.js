const { Sequelize, DataTypes } = require('sequelize');

function createOrderModel(connection) {
  const Order = connection.define('Order', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subtotal: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    closed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
return Order;
}



module.exports = {
  createOrderModel
}