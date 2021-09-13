const { Sequelize, DataTypes } = require('sequelize');

function createOrderProductModel(connection, ordersModel, productsModel) {
  const OrdProd = connection.define('OrderProduct', {
    // Model attributes are defined here
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: ordersModel,

        // This is the column name of the referenced model
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: productsModel,

        // This is the column name of the referenced model
        key: 'id'
      }
    }}, 
    {
    // Other model options go here
    modelName: 'OrderProduct',
    tableName: 'orderproduct'
  });
  return OrdProd;
}

module.exports = {
  createOrderProductModel
}