const express = require ('express');
const userController = require ('../controllers/userController');
const validaciones = require('../middlewares/miduser');
const router = express.Router();

router.get('/users', userController.show); //agregar middleware, solo el admin puede verlo
router.post('/users', userController.register);
router.put('/users/:id', userController.edit);
router.delete('/users/:id', userController.delete);

router.post('/login', validaciones.validar, userController.login);

module.exports = router;