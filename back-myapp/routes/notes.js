//@ts-check

import express from 'express'

const router = express.Router()
const {verificarAuth, verificarAdmin} = require('../middlewares/authentication')

// import note mode
import Note from '../models/nota'

// adding a note

router.post('/new-note', verificarAuth, async (req, res) => {

    const body = req.body
    body.userId = req.user._id 
    try {
        const noteDB = await Note.create(body)
        res.status(200).json(noteDB)
    } catch (error) {
        return res.status(500).json({ 
            message: "error has occurred",
            error
        })
    }
})
// GET with params     
router.get('/note/:id', async (req, res) => {

    const _id = req.params.id
    try {
        const noteDB = await Note.findOne({_id})
        res.json(noteDB)
    } catch (error) {
        return res.status(500).json({ 
            message: "error has occurred",
            error
        })
    }
})

// GET to list notes
/*
router.get('/notes', verificarAuth, async (req, res) => {

    const userId = req.user._id
    
    try {
        const noteDB = await Note.find({userId})
        res.json(noteDB)
    } catch (error) {
        return res.status(500).json({ 
            message: "error has occurred",
            error
        })
    }
})
*/
// GET con paginación
router.get('/notes', verificarAuth, async (req, res) => {

    const userId = req.user._id
    const limit = Number(req.query.limit) || 10
    const skip = Number(req.query.skip) || 0
    
    try {
        const noteDB = await Note.find({userId}).limit(limit).skip(skip)
        const totalNotes = await Note.find({userId}).countDocuments()

        res.json({noteDB, totalNotes})
    } catch (error) {
        return res.status(500).json({ 
            message: "error has occurred",
            error
        })
    }
})

// DELETE
router.delete('/note/:id', async (req, res) => {

    const _id = req.params.id
    try {
        const noteDB = await Note.findByIdAndDelete({_id})
        res.json(noteDB)
    } catch (error) {
        return res.status(500).json({ 
            message: "error has occurred: id not found",
            error
        })
    }
})

// PUT
router.put('/note/:id', async (req, res) =>{

    const _id = req.params.id
    const body = req.body
    try {
        
        const noteDB = await Note.findByIdAndUpdate(_id, body,{new: true})
        res.json(noteDB)
    } catch (error) {
        return res.status(500).json({ 
            message: "error has occurred",
            error
        })
    }
})

module.exports = router
