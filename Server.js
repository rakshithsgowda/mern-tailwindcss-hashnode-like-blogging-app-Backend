const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
const dbConnect = require('./config/db/dbConnect')
const userRoutes = require('./route/users/usersRoute')
const { errorHandler } = require('./middlewares/error/errorHandler')

const app = express()

dbConnect()
// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Users routes
app.use('/api/users', userRoutes)

// error hanlder routes
app.use(errorHandler)

//  server
const port = process.env.PORT || 8000
app.listen(port, console.log(`server is running on port ${port}`))
