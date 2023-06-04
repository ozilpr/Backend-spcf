import express from 'express'
import cors from 'cors'
import session from 'express-session'
import dotenv from 'dotenv'
import { conn } from './config/Database.js'
import MySQLStore from 'express-mysql-session'
import EvidenceRoute from './routes/EvidenceRoute.js'
import HipotesaRoute from './routes/HipotesaRoute.js'
import RulesRoute from './routes/RulesRoute.js'
import UserRoute from './routes/UserRoute.js'
import AuthRoute from './routes/AuthRoute.js'

dotenv.config()

const app = express()

const MySQLStoreSession = new MySQLStore(session)
const sessionStore = new MySQLStoreSession({}, conn)

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      secure: 'auto',
    },
  })
)

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
)

app.use(express.json())
app.use(EvidenceRoute)
app.use(HipotesaRoute)
app.use(RulesRoute)
app.use(UserRoute)
app.use(AuthRoute)

app.listen(process.env.APP_PORT, () => {
  console.log('Server up and running...')
})
