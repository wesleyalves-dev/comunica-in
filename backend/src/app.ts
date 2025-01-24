import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'

import { config } from './config'
import { database } from './infra/database'

async function bootstrap(): Promise<void> {
  const app = express()

  await database.initialize()

  app.use(cors())
  app.use(helmet())
  app.use(compression())
  app.use(morgan('tiny'))

  app.get('/api/hello', (_, response): void => {
    response.json({ message: 'Hello World' })
  })

  app.all('*', (_, response): void => {
    response.status(404).json({ message: 'Not Found' })
  })

  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`)
  })
}

bootstrap()
