import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import dbConnect from './config/db/dbConnect.js'
import userRoutes from './route/users/usersRoute.js'
import { errorHandler, notFound } from './middlewares/error/errorHandler.js'

const app = express()
dbConnect()

// Middleware
app.use(express.json())
app.use(cors())

// Users routes
app.use('/api/users', userRoutes)

// error hanlder routes
// app.use(notFound)
app.use(notFound, errorHandler)

//  server
const port = process.env.PORT || 8000
app.listen(port, console.log(`server is running on port ${port}`))
