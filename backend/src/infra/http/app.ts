import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'

import { config } from '../../config'
import { database } from '../../infra/database'
import { routes } from './routes'
import { notFound } from './middleware'

async function bootstrap(): Promise<void> {
  const app = express()

  await database.initialize()

  app.use(cors())
  app.use(helmet())
  app.use(compression())
  app.use(morgan('tiny'))
  app.use(express.json())
  app.use('/api', routes)
  app.all('*', notFound)

  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`)
  })
}

bootstrap()
