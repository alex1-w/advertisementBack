const Router = require('express')  // импортируем элемент роутер из express 

const categoriesRoute = require('./category')
const advertisementRoute = require('./advertisement')
const userRouter = require('./userRouter')
const router = Router() // 

router.use('/categories', categoriesRoute) // создаем роут
router.use('/advertisements', advertisementRoute)
router.use(`/user`, userRouter)  


module.exports = router