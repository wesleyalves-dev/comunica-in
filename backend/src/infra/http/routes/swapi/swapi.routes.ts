import { Router } from 'express'

import { SwapiController } from './swapi.controller'

const controller = new SwapiController()

const routes = Router()

routes.get('/', (request, response) => controller.list(request, response))
routes.get('/:id', (request, response) => controller.get(request, response))

export { routes as swapiRoutes }
