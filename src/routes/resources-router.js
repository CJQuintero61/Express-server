/*
  resources-router.js

  the router for all /api/resources endpoints
*/
import { Router } from 'express'
import { pool } from '../db/index.js'

const router = Router()

/*
  helper function to parse the id from the url

  id's must be positive non-zero integers,
  else set to null
*/
function parseId(id) {
  const n = Number(id)
  return Number.isInteger(n) && n > 0 ? n : null
}

/*
  GET /api/resources/
  returns all items currently in the tasks table
*/
router.get('/', async (req, res) => {
  // fetch
  const { rows } = await pool.query(`
    SELECT * FROM tasks ORDER BY id ASC
  `)

  // send response
  res.json(rows)
})

/*
  GET /api/resources/:id
  returns a specific item by id, or 404 if not found
*/
router.get('/:id', async (req, res) => {
  // get the id field from the request
  const id = parseId(req.params.id)
  if (!id) {
    return res.status(404).json({ error: "Task not found" })
  }

  // fetch
  const { rows } = await pool.query(
    `SELECT * FROM tasks WHERE id = $1`, [id]
  )

  // check if not found
  if (rows.length === 0) {
    return res.status(404).json({ error: 'Task not found' })
  }

  // return the json response for the specific task
  res.json(rows[0])
})

/*
  POST /api/resources/
  adds an entry to the tasks table
*/
router.post('/', async (req, res) => {
  // extract column data from request
  const { title, completed = false, priority = null } = req.body ?? {}

  // check for empty title
  if (!title) {
    return res.status(400).json({ error: 'Task title is required' })
  }

  // perform the insert and return what was inserted
  const { rows } = await pool.query(
    `INSERT INTO tasks (title, completed, priority) VALUES ($1, $2, $3) RETURNING *`,
    [title, completed, priority]
  )

  // created successfully
  res.status(201).json(rows[0])
})

/*
  PUT /api/resources/:id
  replaces an existing task by id
*/
router.put('/:id', async (req, res) => {
  // get id and check
  const id = parseId(req.params.id)
  if (!id) {
    return res.status(404).json({ error: "Task not found" })
  }

  // destructure the request
  const { title, completed = false, priority = null } = req.body ?? {}
  if (!title) {
    return res.status(400).json({ error: 'Task title is required' })
  }

  // perform query
  const { rows } = await pool.query(
    `UPDATE tasks SET title = $1, completed = $2, priority = $3 WHERE id = $4 RETURNING *`,
    [title, completed, priority, id]
  )

  // check the update worked
  if (rows.length === 0) {
    return res.status(404).json({ error: "Task not found" })
  }

  // return result
  res.json(rows[0])  
})

/*
  DELETE /api/resources/:id
  deletes an existing task by id
*/
router.delete('/:id', async (req, res) => {
  // get id and check
  const id = parseId(req.params.id)
  if (!id) {
    return res.status(404).json({ error: "Task not found" })
  }

  // delete by PK
  const { rows } = await pool.query(
    `DELETE FROM tasks WHERE id = $1 RETURNING *`,
    [id]
  )

  // check the result
  if (rows.length === 0) {
    return res.status(404).json({ error: "Task not found" })
  }

  res.json(rows[0])
})

export default router
