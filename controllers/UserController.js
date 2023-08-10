const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("js-cookie")

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

      const userToken = jwt.sign({ id: user.id }, "fqugwqgfuiewfgefugieho", {
        expiresIn: "15m",
      });
      // console.log(req.body.);

      // if () {
      // }

      cookie.set('userToken', userToken, { expires: 1 })

      return res.status(200).json({ id: user.id, token: userToken });

    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = UserController;