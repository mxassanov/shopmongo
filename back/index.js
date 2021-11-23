const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')
const { routes } = require('./src/routes')

mongoose.connect(
    'mongodb://127.0.0.1:27017/mevnshop', { useUnifiedTopology: true }
)

const app = express()
app.use(cors({
    credentials: true
}))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

routes.forEach(route => {
    app.use(`/api/${route}`, require(`./src/routes/${route}`))
})

const PORT = 3000
app.listen(PORT)
console.log(`server is running at ${PORT}`)
