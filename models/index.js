const sequelize = require('../dbConnection/dbConnection')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    login: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'User'
    }
})

const Category = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
    },
    description: {
        type: DataTypes.STRING(500)
    },
    image: {
        type: DataTypes.STRING(500)
    }
})

const Advertisement = sequelize.define('advertisement', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING(10000),
    },
    image: {
        type: DataTypes.STRING,
        unique: true
    },
})

Advertisement.belongsTo(User)
Advertisement.belongsTo(Category)
User.hasOne(Advertisement)
Category.hasOne(Advertisement)


module.exports = { User, Category, Advertisement }