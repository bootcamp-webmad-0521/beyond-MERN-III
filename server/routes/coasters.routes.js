const express = require('express')
const router = express.Router()
const { handleMongoooseError, isValidIdFormat } = require('../utils')

const Coaster = require('./../models/Coaster.model')



router.get('/getAllCoasters', (req, res) => {

    Coaster
        .find()
        .select('title imageUrl owner')
        .sort({ createdAt: 1 })
        .then(response => setTimeout(() => res.json(response), 200))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching coasters', err }))
})


router.get('/getOneCoaster/:coaster_id', (req, res) => {

    const { coaster_id } = req.params

    if (isValidIdFormat(coaster_id)) {

        Coaster
            .findById(coaster_id)
            .then(response => res.json(response))
            .catch(err => res.status(500).json({ code: 500, message: 'Error fetching coaster', err }))

    } else {
        res.status(500).json({ code: 400, message: 'Invalid URL' })
    }

})


router.post('/newCoaster', (req, res) => {

    const coaster = { owner: req.session.currentUser._id, ...req.body }

    Coaster
        .create(coaster)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching coaster', errors: handleMongoooseError(err) }))
})


router.put('/editCoaster/:coaster_id', (req, res) => {

    const coaster = req.body

    Coaster
        .findByIdAndUpdate(req.params.coaster_id, coaster)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error editing coasters', err }))
})


module.exports = router