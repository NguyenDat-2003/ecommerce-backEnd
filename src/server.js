import express from 'express'
import DBCONNECT from '~/config/mongoose'
import { env } from './config/environment'

const app = express()
// --------------------CONNECT MONGOOSEDB----------------------
DBCONNECT()

app.get('/', (req, res) => {
  res.end('<h1>Hello World!</h1><hr>')
})

app.listen(env.LOCAL_DEV_APP_PORT, () => {
  console.log(`Hello Dat Dev, I am running on port:${env.LOCAL_DEV_APP_PORT}`)
})
