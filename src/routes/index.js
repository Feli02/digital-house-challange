const express = require('express');
const router = express.Router();


const mainController = require('../controllers/mainController');

router.get('/', mainController.show);
router.get('/allUsuarios', mainController.users)
router.get('/allUsuarios/:id', mainController.detailUser);
router.get('/allUsuarios/edit/:id', mainController.edit);
router.post('/allUsuarios/update/:id', mainController.update);
router.post('/allUsuarios/delete/:id', mainController.destroy);

module.exports = router;