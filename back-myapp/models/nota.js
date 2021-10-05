//@ts-check
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const noteSchema =  new Schema({
    name: {type: String, required: [true, 'Nombre obligatorio']},
    description: String,
    userId: String,
    date: {type: Date, default: Date.now},
    state: {type: Boolean, default: true} 
})
// converting to a model 
const Note = mongoose.model('Note', noteSchema)

export default Note