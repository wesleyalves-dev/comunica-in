import { Router } from 'express'

import { auth } from '../middleware'
import { authRoutes } from './auth'
import { userRoutes } from './user'
import { swapiRoutes } from './swapi'

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/users', auth, userRoutes)
routes.use('/swapi', auth, swapiRoutes)

export { routes }
