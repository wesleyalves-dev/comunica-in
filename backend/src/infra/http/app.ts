import 'dotenv/config'
import express, { type Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import cookies from 'cookie-parser'
import 'express-async-errors'

import { database } from '../../infra/database'
import { routes } from './routes'
import { notFound, errorHandler } from './middleware'

export async function bootstrap(): Promise<Express> {
  const app = express()

  await database.initialize()

  app.use(cors())
  app.use(helmet())
  app.use(compression())
  app.use(morgan('tiny'))
  app.use(express.json())
  app.use(cookies())
  app.use('/api', routes)
  app.all('*', notFound)
  app.use(errorHandler)

  return app
}
