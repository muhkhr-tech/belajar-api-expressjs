const express = require('express')
const sequelize = require('../../database')
const user = require('../models').user

const router = express.Router()

router.use(express.urlencoded({extended: true}))

router.get('/', async (req, res) => {
    const data = await user.findAll()

    res.send(data)
})

router.post('/', async (req, res) => {
    await user.create(req.body)

    res.status(201)
})

module.exports = router