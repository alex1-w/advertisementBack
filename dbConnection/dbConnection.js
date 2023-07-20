const { Sequelize } = require('sequelize')

const login = 'user'
const password = 'root'

const sequelize = new Sequelize('advertisement', login, password, {
    dialect: 'sqlite',
    host: './db.sqlite'
})

module.exports = sequelize