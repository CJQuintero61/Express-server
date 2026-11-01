/*
  server.js

  starts the server to listen on a port. For the internal
  wiring, see app.js
*/
import app from './app.js'
const port = 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
