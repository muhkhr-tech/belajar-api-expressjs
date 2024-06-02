const express = require('express')
const userController = require('../controllers/user-controller')

const router = express.Router()

router.use(express.urlencoded({extended: true}))

router.get('/', userController.get)

router.post('/', userController.create)

module.exports = router