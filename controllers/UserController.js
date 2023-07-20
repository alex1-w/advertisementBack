const { User } = require('../models/index')
const bcrypt = require('bcrypt')

const UserController = {
    async registration(req, res) {
        console.log(req.body);
        const login = req.body.login

        if (login.length < 3) {
            return res.status(400).json('слишком короткий логин')
        }
        const password = req.body.password
        if (password.length < 6) return res.status(400).json('пароль меньше 6-ти символов')

        try {
            const hashedPassword = await bcrypt.hash(password, 2)
            const user = await User.create({ login, password: hashedPassword })
            // return res.status(200).json('успешно зарегистрирован')
            return res.status(200).json({ login: user.login })
        }
        catch (err) {
            res.status(400).json({ message: 'такой пользователь уже зарегистрирован' })
        }
    },
    async authentication(req, res) {
        console.log(req.body);
        const users = await User.findAll()
        console.log(users);
        // if (login.length < 3) {
        //     return res.status(400).json('слишком короткий логин')
        // }
        // const password = req.body.password
        // try {
        //     // const user = await User.findAll({ login, password })
        //     return res.status(200).json(user)
        // }
        // catch (err) {
        //     res.status(400).json({ message: 'такой пользователь уже зарегистрирован' })
        // }

        res.status(200).json(login)
    }
}

module.exports = UserController