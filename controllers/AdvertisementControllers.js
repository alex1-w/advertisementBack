const { Advertisement } = require('../models/index')
const jwt = require("jsonwebtoken");

const AdvertisementController = {

    async getAdvertisements(req, res) {
        const advertisements = await Advertisement.findAll()
        return res.status(200).json(advertisements)
    },

    async getAdvertisement(req, res) {
        // const token = req.headers.authorization.replace('Bearer ', '')
        // try {
        //     const jwtToken = jwt.verify(token, 'fqugwqgfuiewfgefugieho')
        //     console.log(jwtToken);
        // } catch (err) { 
        //     return res.status(401).json({message:'не авторизован'})
        // }


        const advertisement = await Advertisement.findOne({
            where: { id: req.params.id }
        })
        return res.status(200).json(advertisement)
    },

    async getFilteredAdvertisements(req, res) {
        const categoryAdvertisements = await Advertisement.findAll({
            where: {
                categoryId: req.params.id
            }
        })
        return res.status(200).json(categoryAdvertisements)
    },

    async createAd(req, res) {

        const name = req.body.name
        if (name.length < 2) { return res.status(400).json({ message: "название меньше 2-x символов" }) }

        if (name.length > 40) { return res.status(400).json({ message: "название больше 40 символов" }) }

        const category = req.body.category
        if (!category) { return res.status(400).json({ message: "категория не выбрана" }) }

        const description = req.body.description
        if (description.length < 20) { return res.status(400).json({ message: "описание меньше 20-ти символов" }) }

        const image = req.body.image
        if (!image) { return res.status(400).json({ message: "фотографии не выбраны" }) }

        const token = req.headers.authorization
        console.log(token);

        if (!token) {
            return req.status(401).json({ message: "пользователь не авторизован" })
        }

        if (token) {

            const replaceToken = token.replace('Bearer ', '')
            try {
                const jwtData = replaceToken.verify(token, 'fqugwqgfuiewfgefugieho')
                console.log(jwtData, 5487543845385486, replaceToken);
                try {
                    const advertisement = await Advertisement.create({
                        name: name,
                        description: description,
                        categoryId: category,
                        image: image,
                        userId: jwtData.id
                    })
                    return res.status(200).json(advertisement)
                }
                catch (error) {
                    console.log(error);
                    return res.status(400).json({ message: 'ошибка' })
                }
            } catch (err) {
                return res.status(401).json({ message: 'пользователь не авториезован' })
            }
        }




    },
}

module.exports = AdvertisementController