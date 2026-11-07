/*
  init.js

  creates the tasks table and adds dummy data.
  run once when first setting up the project or removing then rebuilding the volume:
    npm run init-db
*/
import { pool } from "./index.js"

try {

  /*
    create the tasks table

    tasks are created with their completed status set to false
    and priorities are optional, so they are nullable
  */
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT false,
      priority VARCHAR(255)
    )
  `)
  
  // init data
  const tasks = [
    { title: "Buy groceries",             completed: false, priority: "medium" },
    { title: "Finish Express assignment", completed: false, priority: "high" },
    { title: "Walk the dog",              completed: true,  priority: "low" },
    { title: "Call the dentist",          completed: false, priority: "medium" },
    { title: "Clean the kitchen",         completed: false, priority: "low" },
  ]

  // iterate over the data and insert each row
  for (const { title, completed, priority } of tasks) {
    await pool.query(
      "INSERT INTO tasks (title, completed, priority) VALUES ($1, $2, $3)",
      [title, completed, priority]
    )
  }

  console.log("database initialized")
} catch (err) {
  console.error("init failed:", err.message)
  process.exitCode = 1
} finally {
  // close the pool
  await pool.end()
}
