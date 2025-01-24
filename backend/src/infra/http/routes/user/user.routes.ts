import { Router } from 'express'

import { UserController } from './user.controller'

const controller = new UserController()

const routes = Router()

routes.get('/', (request, response) => controller.list(request, response))
routes.get('/:id', (request, response) => controller.get(request, response))
routes.post('/', (request, response) => controller.create(request, response))
routes.put('/:id', (request, response) => controller.update(request, response))
routes.delete('/:id', (request, response) =>
  controller.delete(request, response)
)

export { routes as userRoutes }
