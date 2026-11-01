/*
  logger.js

  a simple middleware logger that logs
  the timestamp, request method, and url
  for all endpoints
*/

function logger(req, res, next) {
  console.log(`time: ${new Date().toISOString()}, method: ${req.method}, URL: ${req.originalUrl}`)
  next()
}

export default logger
