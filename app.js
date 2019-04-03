require('dotenv').config()

const express = require('express')
const routes = require('./routes')

const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', routes)

app.listen(PORT, _ => {
  console.log('Listening on port %i...', PORT)
})