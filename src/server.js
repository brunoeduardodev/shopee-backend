const express = require('express')
require('./database')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(routes)

const port = process.env.PORT || 3333

app.listen(port)
console.log(`Listening port ${port}`)
