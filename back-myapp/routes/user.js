//@ts-check
import express from 'express'
import User from '../models/user'

const router = express.Router()
const {verificarAuth, verificarAdmin} = require('../middlewares/authentication')

// Hash Contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Filtrar campos de PUT
const _ = require('underscore');

// POST  
router.post('/new-user', async (req, res) => {

    const body = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }
    body.password = bcrypt.hashSync(req.body.password, saltRounds)

    try {
        const userDB = await User.create(body)
        res.json(userDB)
    } catch (error) {
        return res.status(401).json({
            message: 'Error has occurred',
            error
        })
    }
})

// put

router.put('/user/:id', [verificarAuth, verificarAdmin], async (req, res) => {
    
    const _id = req.params.id
    const body = _.pick(req.body, ['name','email','password','active'])
    if (body.password){
        body.password = bcrypt.hashSync(req.body.password, saltRounds)
    }

    try {
        const userDB = await User.findByIdAndUpdate(_id, body, {new: true, runValidators: true});

        return res.json(userDB)
    } catch (error) {
        return res.status(400).json({
            message: 'Error has occurred',
            error
        })
    }
})

module.exports = router