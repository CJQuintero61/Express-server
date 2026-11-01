/*
  app.js

  the main script for the api and endpoints
*/
import router from './routes/api-router'

const express = require('express')
const app = express()

app.use(express.json()) // needed to read json
app.use('/api', apiRouter) // for all /api endpoints

// the default endpoint
app.get('/', (req, res) => {
  res.send("hello world")
})

module.exports = app
