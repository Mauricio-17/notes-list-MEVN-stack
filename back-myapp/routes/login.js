//@ts-check
import express from 'express'
import User from '../models/user'

const router = express.Router()
const jwt = require('jsonwebtoken')

// Hash Contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', async (req, res) => {

    const body = req.body
    try {
        // evaluando email
        const userDB = await User.findOne({email: body.email})
        if(!userDB){
            return res.status(400).json({
                message: 'El usuario no existe'
            })
        }
        // evaluando Contraseña
        if( !bcrypt.compareSync(body.password, userDB.password)){
            return res.status(400).json({
                message: 'Email o contraseña incorrecta'
            })
        }
        // Generar Token
        let token = jwt.sign({
            data: userDB
        }, 'secret', { expiresIn: 60 * 60 * 24 * 30}) // Expira en 30 días
        res.json({
            userDB,
            token
        })
    } catch (error) {
        return res.status(400).json({
            message: 'Error has occurred',
            error
        })
    }
})

module.exports = router