const mongoose = require('mongoose')

const dbConnect = async (req, res) => {
  try {
    await mongoose.connect(
      process.env.MONGODB_DATABASE_URL.replace(
        '<password>',
        process.env.MONGODB_DATABASE_PASSWORD
      ),
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    )
    console.log('DB connected successfully')
  } catch (error) {
    console.log(`Error ${error.message}`)
  }
}

module.exports = dbConnect
