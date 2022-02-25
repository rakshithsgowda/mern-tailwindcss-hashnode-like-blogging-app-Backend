import mongoose from 'mongoose'

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_LOCAL)
    console.log('DB connected successfully')
  } catch (error) {
    console.log(`Error ${error.message}`)
  }
}

export default dbConnect
