const Sequelize = require("sequelize");
const { createUserModel } = require("./models/users.js");
const { createProductModel } = require("./models/products.js");
const { createOrderModel } = require("./models/orders.js");
const { createOrderTypeModel } = require("./models/orderTypes.js");
const { createPaymentTypeModel } = require("./models/paymentTypes.js");
const { createUserAddressModel } = require("./models/userAddress.js");
const { createCarritoModel } = require("./models/carrito.js");
//const { createOrderProductModel } = require("./models/orderproduct.js");

const models = {};

async function connect(host, port, username, password, database) {
    const connection = new Sequelize({
      database,
      username,
      password,
      host,
      port,
      dialect: 'mariadb',
      // logging: false
    });

    //MODELOS
    models.User = createUserModel(connection);
    models.Product = createProductModel(connection);
    models.Order = createOrderModel(connection);
    models.PaymentType = createPaymentTypeModel(connection);
    models.OrderType = createOrderTypeModel(connection);
    models.UserAddress = createUserAddressModel(connection);
    models.Carrito = createCarritoModel(connection);
    //models.OrderProduct = createOrderProductModel(connection, models.Order, models.Product);

    //RELACIONES
    models.User.hasMany(models.Order);
    models.Order.belongsTo(models.User);
    models.Order.belongsToMany(models.Product, { through: 'OrderProduct' });
    models.Product.belongsToMany(models.Order, { through: 'OrderProduct' });
    models.Order.hasOne(models.PaymentType);
    models.PaymentType.belongsToMany(models.Order, { through: 'OrderPaymentType' });
    models.Order.hasOne(models.OrderType);
    models.OrderType.belongsToMany(models.Order, { through: 'OrderOrderType' });
    models.Carrito.belongsToMany(models.UserAddress, { through: 'CarritoUserAddress' });
    models.UserAddress.belongsToMany(models.Carrito, { through: 'CarritoUserAddress' });
    models.Carrito.belongsToMany(models.Order, { through: 'CarritoOrder'});
    models.Order.belongsToMany(models.Carrito, { through: 'CarritoOrder'});

      try {
          await connection.authenticate();
          await connection.sync();
          console.log('Connection has been established successfully.');
        } catch (error) {
          console.error('Unable to connect to the database:', error);
        }
    }

    function getModel(name) {
      if (models[name]) {
        return models[name];
      } else {
        console.error(`Model ${name} does not exists.`);
        return null;
      }
    }

module.exports = {
    connect,
    getModel
}