import { Router } from 'express'

import { userRoutes } from './user'
import { swapiRoutes } from './swapi'

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/swapi', swapiRoutes)

export { routes }
