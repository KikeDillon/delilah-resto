const express = require ('express');
const adminController = require ('../controllers/adminController');
const carritoController = require('../controllers/carritoController');
const userController = require('../controllers/userController');
const payController = require('../controllers/payController');
const { admin } = require('../middlewares/miduser');
const { authorize } = require('../middlewares/midjwt');
const { cache } = require('../middlewares/cache');
const router = express.Router();

router.get('/products', cache , adminController.show);
router.post('/products', authorize , admin , adminController.create);
router.put('/products/:id', authorize , admin , adminController.modify);
router.delete('/products/:id', authorize , admin , adminController.delete);

router.get('/payments', authorize , admin, payController.show);
router.post('/payments', authorize , admin, payController.create);
router.put('/payments/:id', authorize , admin , payController.modify);
router.delete('/payments/:id', authorize , admin , payController.delete);

router.put('/orders/admin/:id', authorize , admin , carritoController.ordType);

router.put('/users/admin/:id', authorize, admin , userController.admin);

module.exports = router;

