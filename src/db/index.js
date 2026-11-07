/*
  index.js

  creates a db connection pool to export to other files
  so many different connection pools aren't made
*/
import pg from "pg"

// local db, not sensitive
const DB_URL = "postgresql://postgres:postgres@localhost:5432/express-server-assignment"

// make a connection pool to use
export const pool = new pg.Pool({ connectionString: DB_URL })
