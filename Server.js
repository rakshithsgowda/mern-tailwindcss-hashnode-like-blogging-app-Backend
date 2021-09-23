const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
const dbConnect = require('./config/db/dbConnect')
const {
  userRegisterController,
} = require('./controllers/users/usersController')

const app = express()

dbConnect()
// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// Register
app.post('api/users/register', userRegisterController)

// Login
app.post('api/users/login', (req, res) => {
  // bussiness logic
  res.json({ user: 'User Logged In' })
})

// fetch all users
app.get('api/users', (req, res) => {
  // bussiness logic
  res.json({ user: 'User Registered' })
})

//  server
const port = process.env.PORT || 8000

app.listen(port, console.log(`server is running on port ${port}`))
