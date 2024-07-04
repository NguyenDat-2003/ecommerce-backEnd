import express from 'express'
import DBCONNECT from '~/config/mongoose'
import { env } from './config/environment'
import { APIs_V1 } from './routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'

const app = express()
// --------------------CONNECT MONGOOSE----------------------
DBCONNECT()

// --------------------CONFIG APP----------------------
app.use(express.json({ limit: '10kb' }))

app.use('/api/v1', APIs_V1)

// ----MiidleWare xử lý lỗi tập trung
app.use(errorHandlingMiddleware)

// --------------------START SERVER----------------------
app.listen(env.LOCAL_DEV_APP_PORT, () => {
  console.log(`Hello Dat Dev, I am running on port:${env.LOCAL_DEV_APP_PORT}`)
})
