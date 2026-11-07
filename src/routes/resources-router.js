/*
  resources-router.js

  the router for all /api/resources endpoints
*/
import { Router } from 'express'
import { pool } from '../db/index.js'

const router = Router()

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
  // get the id field from the quest
  const id = req.params.id

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
  adds an item to the tasks list
*/
router.post('/', (req, res) => {
  // check for empty body
  if (!req.body) {
    return res.status(400).json({ error: 'Request body is required' })
  }
  
  // make the new task with the input data and a randomly generated ID
  const newTask = { ...req.body, id: randomUUID() }
  tasks.push(newTask)           // add to the list
  res.status(201).json(newTask) // created successfully
})

/*
  PUT /api/resources/:id
  replaces an existing task by id
*/
router.put('/:id', (req, res) => {
  // check for empy body
  if (!req.body) {
    return res.status(400).json({ error: "Request body is required" })
  }

  // find the index of the item to update
  const idx = tasks.findIndex(t => t.id === req.params.id)
  if (idx === -1) {
    return res.status(404).json({ error: 'Task not found' })
  }

  // update the task
  tasks[idx] = { ...req.body, id: req.params.id }

  // send the updated task
  res.json(tasks[idx])
})

/*
  DELETE /api/resources/:id
  deletes an existing task by id
*/
router.delete('/:id', (req, res) => {
  // find it
  const idx = tasks.findIndex(t => t.id === req.params.id)
  if (idx === -1) {
    return res.status(404).json({ error: 'Task not found' })
  }

  // delete only the 1 item using its index
  const [deleted] = tasks.splice(idx, 1)
  res.json(deleted)
})

export default router
