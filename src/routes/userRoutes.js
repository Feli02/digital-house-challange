const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const validationRegister = require('../middlewares/registerMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware')


router.get('/ingresar', guestMiddleware, userController.login)
router.get('/registro', userController.register);
router.post('/registro', validationRegister, userController.storeUser)
router.get('/perfil', authMiddleware, userController.profile);
router.post('/loguearse', userController.loguearse);
router.get('/salir', userController.logout);
router.post('/eliminar/:id', userController.eliminar);
router.get('/editar/:id', userController.edit);
router.post('/editar/:id', validationRegister, userController.update);


module.exports = router