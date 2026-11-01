/*
  resources-router.js

  the router for all /api/resources endpoints
*/
import { Router } from 'express'
import { randomUUID } from 'crypto' // for random ID generation

const router = Router()

// in memory data that resets when the server restarts
const tasks = []

/*
  GET /api/resources/
  returns all items currently in the array
*/
router.get('/', (req, res) => {
  res.json(tasks)
})

/*
  GET /api/resources/:id
  returns a specific item by id, or 404 if not found
*/
router.get('/:id', (req, res) => {
  // find the task that matches id with one in the array
  const task = tasks.find(t => t.id === req.params.id)

  // check if not found
  if (!task) {
    return res.status(404).json({ error: 'Task not found' })
  }

  // return the json response
  res.json(task)
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
  updates an existing task by id
*/
router.put('/:id', (req, res) => {
  // find the index of the item to update to update
  const idx = tasks.findIndex(t => t.id === req.params.id)
  if (idx === -1) {
    return res.status(404).json({ error: 'Task not found' })
  }

  // update the task
  // this keeps existing fields that weren't provided, and only overwrites
  // fields that were given. The id stays the same
  tasks[idx] = { ...tasks[idx], ...req.body, id: req.params.id }

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
