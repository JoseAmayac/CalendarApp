const router = require('express').Router();

const AuthController = require('../controllers/AuthController');

const { loginValidation, registerValidations } = require('../middlewares/validators');
const { checkErrors } = require('../middlewares/checkError');

const { validateJWT } = require('../middlewares/validatejwt');



/**
 * Ruta para iniciar sesión
*/
router.post(
    '/login',
    [
        loginValidation,
        checkErrors
    ],
    AuthController.login);

/**
 * Ruta para el registro de usuarios
*/
router.post(
    '/register',
    [
        registerValidations,
        checkErrors
    ],
    AuthController.register
);

/**
 * Ruta para refrescar el token de autenticación 
*/
router.get('/refresh', [ validateJWT ] , AuthController.refreshToken);

module.exports = router;