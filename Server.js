const express = require('express')
require('dotenv').config()
const dbConnect = require('./config/db/dbConnect')

const app = express()

dbConnect()

//  server
const PORT = process.env.PORT || 8000
app.listen(PORT, console.log(`server is running on port ${PORT}`))
