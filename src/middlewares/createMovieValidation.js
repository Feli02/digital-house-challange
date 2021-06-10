const { body } = require('express-validator')

module.exports = [
    body('title').notEmpty().withMessage('Debes completar el campo de nombre').bail(),
    body('rating').notEmpty().withMessage('Debes completar el campo de rating').bail(),
    body('awards').notEmpty().withMessage('Debes completar el campo de premios').bail(),
    body('release_date').notEmpty().withMessage('Debes completar el campo de premios').bail(),
    body('length').notEmpty().withMessage('Debes completar el campo de premios').bail(),
    body('genre_id').notEmpty().withMessage('Debes completar el campo de premios').bail(),
]