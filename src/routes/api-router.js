/*
  api-router.js

  the router for all /api endpoints
*/
import { Router } from 'express'
import resourcesRouter from './resources-router'

const router = Router()

// from app.js, everything in this page is already a
// /api route then this route links to all /api/resources
// by using the resources router
router.use('/resources', resourcesRouter)

module.exports = router
