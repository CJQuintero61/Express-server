/*
  server.js

  starts the server to listen on a port. For the internal
  wiring, see app.js
*/
import app from './app.js'
import { initDb } from './db/init.js'

const port = 3000

// TODO: fix this since initDb is async 
try {
  app.listen(port, () => {
  initDb()
  console.log(`Listening on http://localhost:${port}`)
})
}
catch (err) {
  console.error("database setup failed:", err.message)
  process.exit(1)
}
