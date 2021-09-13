const { Sequelize, DataTypes } = require('sequelize');

function createProductModel(connection) {
  const Product = connection.define('Product', {
    // Model attributes are defined here
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });
  return Product;
}



module.exports = {
  createProductModel
}