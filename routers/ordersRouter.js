const express = require ('express');
const ordersController = require ('../controllers/ordersController');
const validaciones = require('../middlewares/miduser');
const router = express.Router();

router.get('/orders', ordersController.show);
router.post('/orders',  ordersController.create);
router.put('/orders/:id',  ordersController.edit);
router.delete('/orders/:id', ordersController.delete);

//router.get('/orders/cart/:id');

module.exports = router;