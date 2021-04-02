const { request, response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const login = async(req = request, res = response)=>{
    const { email, password } = req.body;
    
    try {
        const userDB = await User.findOne({ email });

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                message: "Usuario o contraseña incorrectos"
            });
        }

        const validPassword = bcrypt.compareSync(password, userDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: "Usuario o contraseña incorrectos"
            });
        }

        const token = await generateJWT( userDB._id, userDB.name );

        return res.status(200).json({
            ok: true,
            uid: userDB._id,
            name: userDB.name,
            token
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Error en el servidor, por favor intente más tarde"
        });
    }

}

const register = async (req = request, res = response)=>{
    const { email, password } = req.body;
    
    try {

        // Se puede separar la validación a un middleware externo
        let user = await User.findOne({ email });
        if (user) {
            return res.status(422).json({
                ok: false,
                message: "Ya existe un usuario registrado con ese email"
            });
        }

        user = new User( req.body );

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        const userDB = await user.save();

        const token = await generateJWT( userDB._id, userDB.name );

        return res.status(201).json({
            ok: true,
            uid: userDB._id,
            name: userDB.name,
            token
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Error en el servidor, por favor intente más tarde"
        });
    }
}

const refreshToken = async(req = request, res = response)=>{
    const uid = req.uid;
    const name = req.name;
    const token = await generateJWT( uid, name );

    return res.status(200).json({
        ok: true,
        token
    });
}

module.exports = {
    login,
    register,
    refreshToken
}