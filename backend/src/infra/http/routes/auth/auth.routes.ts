import { Router } from 'express'

import { AuthController } from './auth.controller'

const controller = new AuthController()

const routes = Router()

routes.post('/sign-in', (request, response) =>
  controller.signIn(request, response)
)

export { routes as authRoutes }
