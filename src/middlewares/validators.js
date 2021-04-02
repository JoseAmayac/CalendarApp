const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');

const loginValidation = [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'Debe ser un email real').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'La contraseña debe contener al menos 6 caracteres').isLength({ min: 6 }),
]

const registerValidations = [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'Debe ser un email real').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'La contraseña debe contener al menos 6 caracteres').isLength({ min: 6 }),
]

const eventValidations = [
    check('title', 'El título del evento es obligatorio').not().isEmpty(),
    check('start', 'La fecha inicial del evento es obligatoria').not().isEmpty(),
    check('start', 'Formato de fecha incorrecto').custom( isDate ),
    check('end', 'La fecha de finalización del evento es obligatoria').not().isEmpty(),
    check('end', 'Formato de fecha incorrecto').custom( isDate ),
]

module.exports ={
    loginValidation, 
    registerValidations,
    eventValidations
}