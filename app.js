const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth')

app.use(bodyParser.json())

dotenv.config()

app.use('/auth', authRoutes)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    )
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

console.log(process.env.MONGODB_URI)

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('MONGO CONNEDTED')
        app.listen(process.env.PORT)
    })
    .catch((err) => err)
