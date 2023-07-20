const Router = require('express')
const router = Router()

const advertisement = []

router.get('/advertisement', (req, res) => {
    return res.status(200).json(advertisement)
})


module.exports = router