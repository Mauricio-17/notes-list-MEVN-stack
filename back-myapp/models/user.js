//@ts-check

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const uniqueValidator = require('mongoose-unique-validator')

const roles = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} no es un rol válido'
}

const userSchema = new Schema({
    name: {type: String , required: [true, 'Nombre requerido']},
    email: {
        type: String ,
        required: [true, 'Email requerido'],
        unique: true
    },
    password: {type: String , required: [true, 'Contraseña requerida']},
    date: {type: Date, default: Date.now()},
    role: { type: String, default: 'USER', enum: roles },
    active: { type: Boolean, default: true }
})

userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique' })

userSchema.methods.toJSON = function (){
    const obj = this.toObject()
    delete obj.password
    return obj
}

const User = mongoose.model('User', userSchema)

export default User