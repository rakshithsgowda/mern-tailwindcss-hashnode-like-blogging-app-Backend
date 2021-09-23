const mongoose = require('mongoose')

const dbConnect = async (req, res) => {
  try {
    await mongoose.connect(process.env.DATABASE_URL)
    console.log('DB connected successfully')
  } catch (error) {
    console.log(`Error ${error.message}`)
  }
}

module.exports = dbConnect