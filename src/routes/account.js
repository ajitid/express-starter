const { Router } = require('express')

const { login, logout, signup, checkLoggedIn } = require('../controllers/accountController')

const router = Router()

router.post('/login', login)
router.post('/logout', logout)
router.get('/logged-in', checkLoggedIn)
router.post('/signup', signup)

module.exports = router
