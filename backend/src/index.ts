import { bootstrap } from './infra/http/app'
import { config } from './config'

console.clear()
bootstrap().then(app =>
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`)
  })
)
