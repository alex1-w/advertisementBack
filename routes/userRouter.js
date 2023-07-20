const Router = require('express')
const UserController = require('../controllers/UserController')
const router = Router()

router.post('/registration', UserController.registration)
router.get('/authentication', UserController.authentication)

module.exports = router