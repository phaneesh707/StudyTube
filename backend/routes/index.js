import express from 'express'

const defaultRouter = express.Router()

import userRoutes from './userRoutes.js'
import notesRouter from './noteRoutes.js'

defaultRouter.use("/users", userRoutes)
defaultRouter.use("/notes", notesRouter)

export default defaultRouter