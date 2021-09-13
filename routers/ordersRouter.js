const express = require ('express');
const ordersController = require ('../controllers/ordersController');
const carritoController = require ('../controllers/carritoController');
const { authorize } = require('../middlewares/midjwt');
const router = express.Router();

router.get('/orders', ordersController.show);
router.get('/orders/:id', authorize, ordersController.history);
router.post('/orders', authorize, ordersController.create);
router.put('/orders/:id', authorize, ordersController.edit);
router.delete('/orders/:id', authorize, ordersController.delete);

router.get('/orders/carrito/', authorize, carritoController.show);
router.get('/orders/carrito/:id', authorize, carritoController.showOne);
router.post('/orders/carrito/', authorize, carritoController.create);
router.put('/orders/carrito/:id', authorize, carritoController.edit);

module.exports = router;