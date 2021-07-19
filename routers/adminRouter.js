const express = require ('express');
const adminController = require ('../controllers/adminController');
const payController = require('../controllers/payController');
const validaciones = require('../middlewares/miduser');
const router = express.Router();

router.get('/products', validaciones.admin, adminController.show);
router.post('/products', validaciones.admin, adminController.create);
router.put('/products/:id', validaciones.admin, adminController.modify);
router.delete('/products/:id', validaciones.admin, adminController.delete);

router.get('/payments', validaciones.admin, payController.show);
router.post('/payments', validaciones.admin, payController.create);
router.put('/payments/:id', validaciones.admin, payController.modify);
router.delete('/payments/:id', validaciones.admin, payController.delete);

module.exports = router;

