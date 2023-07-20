const Router = require('express')
const router = Router()

const categories = [
    { categoryTitle: 'IT', categoryId: 1, countAds: 43 },
    { categoryTitle: "screenwriter", categoryId: 2, countAds: 34 },
    { categoryTitle: "driver", categoryId: 3, countAds: 675 }
]

router.get('/', (req, res) => {
    res.status(200).json(categories)
})



module.exports = router