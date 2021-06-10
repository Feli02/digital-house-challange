const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const validtaionCreate = require('../middlewares/createMovieValidation')


router.get('/movies/detail/:id', moviesController.detail);

//CRUD
router.get('/movies/add', moviesController.add);
router.post('/movies/create', validtaionCreate, moviesController.create);
router.get('/movies/edit/:id', validtaionCreate, moviesController.edit);
router.post('/movies/update/:id', moviesController.update);
router.post('/movies/delete/:id', moviesController.destroy);

module.exports = router;