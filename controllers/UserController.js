const { User, Advertisement, Category } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("js-cookie");

const UserController = {

  async registration(req, res) {
    console.log(req.body);
    const login = req.body.login;

    if (login.length < 3) {
      return res.status(400).json("слишком короткий логин");
    }
    const password = req.body.password;
    if (password.length < 6)
      return res.status(400).json("пароль меньше 6-ти символов");

    try {
      const hashedPassword = await bcrypt.hash(password, 2);
      const user = await User.create({ login, password: hashedPassword });
      return res.status(200).json({ login: user.login });
    } catch (err) {
      res
        .status(400)
        .json({ message: "такой пользователь уже зарегистрирован" });
    }
  },

  async authentication(req, res) {
    const user = await User.findOne({
      where: { login: req.body.login },
    });

    if (!user) { return res.status(400).json({ message: "пользователь не найден" }) }

    try {
      const isPasswordRight = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!isPasswordRight) { return res.status(400).json({ message: "пароль неверный" }) }

      const userToken = jwt.sign(
        { id: user.id },
        "fqugwqgfuiewfgefugieho",
        { expiresIn: "55m", }
      );
      cookie.set('userToken', userToken, { expires: 1 })

      return res.status(200).json({ id: user.id, token: userToken });

    }
    catch (error) {
      console.log(error);
    }
  },

  async getUserAdvertisements(req, res) {
    const token = req.headers.authorization
    if (!token) { return res.status(401).json({ message: "пользователь не авторизован" }) }

    const splitToken = token.split(' ')[1]
    try {
      const userInfo = jwt.verify(splitToken, 'fqugwqgfuiewfgefugieho')
      const advertisements = await Advertisement.findAll({
        where: {
          userId: userInfo.id
        },
        include: [
          {
            model: Category,
            // include: [{
            //   model:
            // }]
          }
        ]
      })
      return res.status(200).json(advertisements)
    }
    catch (err) {
      console.log(err);
      return res.status(401).json({ message: "пользователь не авторизован" })
    }
  },

  async getUserInfo(req, res) {
    const token = req.headers.authorization
    if (!token) { return res.status(401).json({ message: "пользователь не авторизован" }) }

    const splitToken = token.split(' ')[1]

    try {
      const userInfo = jwt.verify(splitToken, 'fqugwqgfuiewfgefugieho')
      const user = await User.findOne({
        where: {
          id: userInfo.id
        }
      })

      const formatedUser = {
        id: user.id,
        login: user.login,
      }

      return res.status(200).json(formatedUser)
    }
    catch (err) {
      return res.status(401).json({ message: 'вы не авторизованы' })
    }
  },
  async changePassword(req, res) {

    const token = req.headers.authorization
    if (!token) { return res.status(401).json({ message: "пользователь не авторизован" }) }

    const splitToken = token.split(' ')[1]

    try {
      const userInfo = jwt.verify(splitToken, 'fqugwqgfuiewfgefugieho')
      const user = await User.findOne({
        where: {
          id: userInfo.id
        }
      })

      if (!user) { return res.status(400).json({ message: 'такого пользователя нет' }) }

      const isPasswordRight = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!isPasswordRight) { return res.status(422).json({ message: 'старый пароль - неверный' }) }
      console.log(userInfo.id);

      try {
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 2);

        await User.update(
          {
            password: hashedPassword
          },
          {
            where: {
              id: userInfo.id
            }
          }
        )

        return res.status(200).json('пароль изменен')
      } catch (err) {
        return res.status(400).json({ message: 'dddddd' })
      }

    } catch (err) {
      return res.status(401).json({ message: 'вы не авторизованы' })
    }
  },
  
  async checkAuth(req, res) {
    const token = req.headers?.authorization
    if (!token) { return res.status(401).json({ message: 'unauthorized' }) }

    const splitToken = token.split(' ')[1]
    
    try {
      jwt.verify(splitToken, 'fqugwqgfuiewfgefugieho')

      return res.status(200).json({ message: '' })
    } catch (error) {
      return res.status(401).json({ message: 'unauthorized' })
    }
  }
};

module.exports = UserController;