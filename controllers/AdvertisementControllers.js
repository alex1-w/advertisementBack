const { Advertisement, User, Category } = require('../models/index')
const jwt = require("jsonwebtoken");

const AdvertisementController = {

    async getAdvertisements(req, res) {
        const advertisements = await Advertisement.findAll()
        return res.status(200).json(advertisements)
    },

    async getAdvertisement(req, res) {
        const withCheck = req.query?.withCheck

        if (withCheck === 'true') {
            const token = req.headers?.authorization
            const splitToken = token.split(' ')[1]
            try {
                const userInfo = jwt.verify(splitToken, 'fqugwqgfuiewfgefugieho')

                const advertisement = await Advertisement.findOne({
                    where: { id: req.params.id },
                    include: [
                        { model: Category }
                    ]
                })

                if (!advertisement) { return res.status(422).json({ message: 'объявление не найдено' }) }

                if (advertisement.userId !== userInfo.id) { return res.status(422).json({ message: 'объявление не соответствует пользователю' }) }

                return res.status(200).json(advertisement)

            } catch (err) {
                return res.status(401).json({ message: 'пользователь не авторизован' })
            }

        }

        const advertisement = await Advertisement.findOne({
            where: { id: req.params.id },
            include: [
                { model: Category }
            ]
        })
        if (advertisement === null) { return res.status(400).json({ message: 'объявление не найдено' }) }

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
        const category = req.body.categoryId
        if (!category) { return res.status(400).json({ message: "категория не выбрана" }) }
        const description = req.body.description
        if (description.length < 20) { return res.status(400).json({ message: "описание меньше 20-ти символов" }) }
        const image = req.body.image
        if (!image) { return res.status(400).json({ message: "фотографии не выбраны" }) }

        const token = req.headers.authorization

        if (!token) {
            return req.status(401).json({ message: "пользователь не авторизован мавпкупук" })
        }

        if (token) {
            const replaceToken = token.split(' ')[1]
            try {
                const jwtData = jwt.verify(replaceToken, 'fqugwqgfuiewfgefugieho')
                console.log(jwtData, 333333333);
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
    async editAd(req, res) {
        const token = req.headers.authorization
        if (!token) { return res.status(401).json({ message: 'вы не авторизованы' }) }

        try {
            const userInfo = jwt.verify(token.split(' ')[1], 'fqugwqgfuiewfgefugieho')

            try {

                const editedAdvertisement = await Advertisement.update(
                    {
                        name: req.body.name,
                        description: req.body.description,
                        image: req.body.image
                    },
                    {
                        where: {
                            id: req.params.id
                        }
                    }
                )
                console.log(req.body);
                console.log(editedAdvertisement);
                return res.status(200).json('')
            } catch (error) {
                return res.status(400).json({ message: "что-то пошло не так" })
            }

        } catch (error) {
            return res.status(401).json({ message: 'вы не авторизованы' })
        }
    },
    async deleteAdvertisement(req, res) {
        const token = req.headers.authorization
        if (!token) { return res.status(401).json({ message: 'вы не авторизованы' }) }

        // console.log(req.params.id);

        // return res.status(200).json({ message: '' })
        try {

            try {
                const deleteAdvertisement = await Advertisement.destroy(
                    {
                        where: {
                            id: req.params.id
                        }
                    }
                )
                return res.status(200).json(deleteAdvertisement)
            } catch (error) {
                return res.status(400).json({ message: "что-то пошло не так" })
            }

        } catch (error) {
            return res.status(401).json({ message: 'вы не авторизованы' })
        }
    }
}

module.exports = AdvertisementController