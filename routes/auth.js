const express = require('express')
const router = express.Router()
const authController = require('../Controllers/auth.controller')

router.get('/getAll', authController.getUser)
router.get('/getOne/:id', authController.getOne)
router.post('/search', authController.search)
router.post('/signUp', authController.signUp)
router.post('/login', authController.login)
router.put('/update/:id', authController.update)
router.delete('/delete/:id', authController.delete)

module.exports = router
