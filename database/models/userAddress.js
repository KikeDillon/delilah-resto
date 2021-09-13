const { Sequelize, DataTypes } = require('sequelize');

function createUserAddressModel(connection) {
  const UserAddress = connection.define('UserAddress', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return UserAddress;
}



module.exports = {
  createUserAddressModel
}