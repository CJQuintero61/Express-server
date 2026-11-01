/*
  app.js

  the main script for the api and endpoints
*/
import apiRouter from './routes/api-router.js'
import logger from './middleware/logger.js'
import express from 'express'

const app = express()

app.use(logger)             // middleware
app.use(express.json())     // needed to read json
app.use('/api', apiRouter)  // for all /api endpoints

// the default endpoint
app.get('/', (req, res) => {
  res.json({ message: "hello world" })
})

export default app
