const express = require ('express');
const addressController = require('../controllers/addressController');
const userController = require ('../controllers/userController');
const { admin } = require('../middlewares/miduser');
const { authorize, authenticate } = require('../middlewares/midjwt');
const router = express.Router();

router.get('/users', authorize , admin , userController.show);
router.post('/users', userController.register);
router.put('/users/:id', authorize , userController.edit);
router.delete('/users/:id', authorize , userController.delete);

router.post('/login', authenticate, userController.login);

router.get('/address', authorize, addressController.show);
router.post('/address', authorize, addressController.create);
router.put('/address/:id', authorize, addressController.edit);
router.delete('/address/:id', authorize, addressController.delete);

module.exports = router;