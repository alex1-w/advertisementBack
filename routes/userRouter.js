const Router = require('express')
const UserController = require('../controllers/UserController')
const router = Router()

router.post('/registration', UserController.registration)
router.post('/authentication', UserController.authentication)
router.get('/advertisements', UserController.getUserAdvertisements)
router.get('/user-info', UserController.getUserInfo)
router.put('/change-password', UserController.changePassword)

router.get('/ping', UserController.checkAuth)

module.exports = router