const { body } = require('express-validator')
const model = require('../database/models')


module.exports = [
    body('name').notEmpty().withMessage('Debes completar el campo de nombre').bail(),
    body('email')
        .notEmpty().withMessage('Debes completar el campo de email').bail()
        .isEmail().withMessage('El formato esperado es: mail@mail.com'),
    body('password')
        .notEmpty().withMessage('Debes completar el campo de contraseña').bail()
        .isStrongPassword({
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
		    minSymbols: 1
        }).withMessage('La contraseña debe tener: 6 caracteres, 1 mayuscula, 1 número y 1 caracter'),
]