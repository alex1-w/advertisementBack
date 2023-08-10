const Router = require('express')
const { Category } = require('../models')
const CategoryController = require('../controllers/CategoryController')
const router = Router()

router.get('/', CategoryController.getCategories)
router.get(`/:id`, CategoryController.getCategory)

router.post('/', CategoryController.createCategory)

module.exports = router