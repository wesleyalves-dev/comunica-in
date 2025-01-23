import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'

const app = express()

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

app.listen(5000, () => {
  console.log('Server is running on port 5000')
})
