const Router = require('express')
const router = Router()

const advertisements = [
    {
        id: 1,
        name: 'продам кошку',
        description: 'efrbefbferuifer',
        phoneNumber: '+79003032332132321',
        image: 'https://cdn0.youla.io/files/images/720_720_out/64/42/6442178debb70c5a5305febc-1.jpg',
        createdAt: '2023-06-18 17:12:33',
        updatedAt: '2023-06-18 17:12:33'
    },
    {
        id: 432243,
        name: 'сдам квартиру',
        description: 'ewfbjefw nefw bnmefwfe hjjkewf jkewUI GUWEFYU8UEWGFOUIEWGFUIOEWH FIEWQH FIUEWHOIF H UIGuguiorh weruigvyurhr oiuetrjkh hbggiuerkgkjerigjfeosdh riefjgheruiligoi jwieoh aewhgoiouifaoikjsbkerjsgioslkjesorlg nbvr jkewvr uewv ukevrqi uevr',
        phoneNumber: '+79003032332132321',
        image: 'https://cdn0.youla.io/files/images/720_720_out/64/42/6442178debb70c5a5305febc-1.jpg',
        createdAt: '2023-06-18 17:12:33',
        updatedAt: '2023-06-18 17:12:33'
    },
    {
        id: 53453,
        name: 'ремонт мелкой бытовой техники (вохможен на дому))',
        description: 'ewfbjefw nefw bnmefwfe hjjkewf jkewvr jkewvr uewv ukevrqi uevr',
        phoneNumber: '+79003032332132321',
        image: 'https://cdn0.youla.io/files/images/720_720_out/64/42/6442178debb70c5a5305febc-1.jpg',
        createdAt: '2023-06-18 17:12:33',
        updatedAt: '2023-06-18 17:12:33'
    },
    {
        id: 2,
        name: 'air pods б/у',
        description: 'ewfbjefw nefw bnmefwfe hjjkewf jkewvr jkewvr uewv ukevrqi uevr',
        phoneNumber: '+79003032332132321',
        image: 'https://cdn0.youla.io/files/images/720_720_out/64/42/6442178debb70c5a5305febc-1.jpg',
        createdAt: '2023-06-18 17:12:33',
        updatedAt: '2023-06-18 17:12:33'
    },
    {
        id: 3,
        name: 'abibas орегенал',
        description: 'efrbefbferuifer',
        phoneNumber: '+79003032332132321',
        image: 'https://cdn0.youla.io/files/images/720_720_out/64/42/6442178debb70c5a5305febc-1.jpg',
        createdAt: '2023-06-18 17:12:33',
        updatedAt: '2023-06-18 17:12:33'
    },
    {
        id: 5,
        name: 'gerg',
        description: 'ewfbjefw nefw bnmefwregergr gr rgerge fe hjjkewf jkewvr jkewvr uewv ukevrqi uevr',
        phoneNumber: '+79003032332132321',
        image: 'https://cdn0.youla.io/files/images/720_720_out/64/42/6442178debb70c5a5305febc-1.jpg',
        createdAt: '2023-06-18 17:12:33',
        updatedAt: '2023-06-18 17:12:33'
    },
    {
        id: 56,
        name: 'ойфон орегенал',
        description: 'efrbefbferuifer',
        phoneNumber: '+79003032332132321',
        image: 'https://cdn0.youla.io/files/images/720_720_out/64/42/6442178debb70c5a5305febc-1.jpg',
        createdAt: '2023-06-18 17:12:33',
        updatedAt: '2023-06-18 17:12:33'
    },
    {
        id: 306,
        name: 'сдам квартиру 42 кв/м',
        description: 'efrbefbferuifer',
        image: 'https://cdn0.youla.io/files/images/720_720_out/64/42/6442178debb70c5a5305febc-1.jpg',
        phoneNumber: '+79003032332132321',
        createdAt: '2023-06-18 17:12:33',
        updatedAt: '2023-06-18 17:12:33'
    },
]

router.get('/', (req, res) => {
    return res.status(200).json(advertisements)
})


module.exports = router