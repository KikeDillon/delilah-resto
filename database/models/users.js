const { Sequelize, DataTypes } = require('sequelize');

function createUserModel(connection) {
  const User = connection.define('User', {
    // Model attributes are defined here
    userName: {
      type: DataTypes.STRING,
      unique: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
    ,
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userType: {
      type: DataTypes.INTEGER,
    },
    suspended: {
      type: DataTypes.BOOLEAN,
    }

    // Other model options go here
  });
  return User;
}



module.exports = {
  createUserModel
}