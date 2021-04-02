const { response } = require('express');
const { validationResult } = require('express-validator');

const checkErrors  = (req, res = response, next ) =>{
    const errors = validationResult( req );
    if (!errors.isEmpty()) {
        return res.status(422).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();
}

module.exports = {
    checkErrors
}