import { Router } from 'express'

import { userRoutes } from './user'
import { authRoutes } from './auth'
import { swapiRoutes } from './swapi'

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/auth', authRoutes)
routes.use('/swapi', swapiRoutes)

export { routes }
