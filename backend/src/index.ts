import { bootstrap } from './infra/http/app'
import { config } from './config'

bootstrap().then(app =>
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`)
  })
)
