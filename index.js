const cors = require('cors')
const express = require('express')
const app = express()

const router = require('./routes/index')
const sequelize = require('./dbConnection/dbConnection')

const PORT = 5000

const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true
}
app.use(cors(corsOptions))
app.use(express.json({ extends: true }))

app.use('/api', router)

function start() {
    try {
        sequelize.authenticate()
        sequelize.sync()
        app.listen(PORT, () => { console.log('it`s working'); })
    }
    catch (err) {
        console.log(err);
    }
}

start()