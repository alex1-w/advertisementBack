const Router = require('express')
const router = Router()

const categories = [
    {
        id: 1,
        value: "работа",
        link: "/",
        image: '',
        color: "rgba(202, 0, 0, 0.349)",
    },
    {
        id: 2,
        value: "услуги",
        link: "/",
        image: '',
        color: " rgba(255, 204, 0, 0.346)",
    },
    {
        id: 3,
        value: "авто",
        link: "/",
        image: '',
        color: "rgba(175, 202, 0, 0.349)",
    },
    {
        id: 4,
        value: "недвижимость",
        link: "/",
        image: '',
        color: "rgba(0, 34, 202, 0.349)",
    },
    {
        id: 5,
        value: "хобби",
        link: "/",
        image: '',
        color: "rgba(202, 0, 158, 0.349)",
    },
    {
        id: 6,
        value: "товары для дома",
        link: "/",
        image: '',
        color: "rgba(0, 98, 202, 0.349)",
    },
    {
        id: 7,
        value: "животные",
        link: "/",
        image: '',
        color: "rgba(0, 202, 7, 0.549)",
    },
    {
        id: 8,
        value: "электротехника",
        link: "/",
        image: '',
        color: "rgba(202, 0, 54, 0.549)",
    },
]

// const categories = [
//     { categoryTitle: 'IT', categoryId: 1, countAds: 43 },
//     { categoryTitle: "screenwriter", categoryId: 2, countAds: 34 },
//     { categoryTitle: "driver", categoryId: 3, countAds: 675 }
// ]

router.get('/', (req, res) => {
    res.status(200).json(categories)
})



module.exports = router