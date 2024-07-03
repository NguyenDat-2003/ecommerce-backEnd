import mongoose from 'mongoose'
import { env } from './environment'

const DBCONNECT = () => {
  try {
    mongoose.set('strictQuery', false)
    mongoose.connect(env.MONGOOSE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    console.log('DB was connected !!')
  } catch (error) {
    console.log('Some thing Error !!')
  }
}

export default DBCONNECT
