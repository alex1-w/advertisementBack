const Router = require('express')
const router = Router()
const AdvertisementController = require('../controllers/AdvertisementControllers')

router.get('/', AdvertisementController.getAdvertisements)
router.get('/category/:id', AdvertisementController.getFilteredAdvertisements)
router.get('/:id', AdvertisementController.getAdvertisement)
router.post('/', AdvertisementController.createAd)

module.exports = router