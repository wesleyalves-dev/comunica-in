import { Router } from 'express'

import { SwapiController } from './swapi.controller'

const controller = new SwapiController()

const routes = Router()

routes.get('/people/', (request, response) =>
  controller.list(request, response)
)
routes.get('/people/:id', (request, response) =>
  controller.get(request, response)
)

export { routes as swapiRoutes }
