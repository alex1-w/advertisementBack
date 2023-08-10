const { Category } = require('../models/index')

const CategoryController = {
    async getCategories(req, res) {
        const categories = await Category.findAll()
        res.status(200).json(categories)
    },
    async getCategory(req, res) {
        console.log(req.params.id);
        const category = await Category.findOne({
            where: {
                id: req.params?.id
            }
        })
        return res.status(200).json(category)
    },

    async createCategory(req, res) {
        console.log(req.body);
        const name = req.body.name
        if (!name || name?.length < 3) { return res.status(400).json({ message: 'некорректное имя' }) }

        const description = req.body.description
        if (!description || description?.length < 10) { return res.status(400).json({ message: 'некорректное описание' }) }

        const image = req.body.image
        if (!image) { return res.status(400).json({ message: 'картинка обязательно' }) }

        try {
            const category = await Category.create({
                name,
                description,
                image,
            })
            return res.status(200).json(category)
        }
        catch { (error) => console.log(error) }

        // res.status(200).json('категория успешно создана')
    }
}

module.exports = CategoryController