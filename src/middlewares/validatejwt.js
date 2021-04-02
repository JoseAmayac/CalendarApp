const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = ( req = request, res = response, next )=>{
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: "No existe el token en la petición"
        });
    }
    
    try {
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.name = name;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: "Token no válido"
        });
    }

    next();
}

module.exports={
    validateJWT
}