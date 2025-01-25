import { DataSource, SimpleConsoleLogger } from 'typeorm'

import { config } from '../../config'

export const database = new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  database: config.database.name,
  username: config.database.user,
  password: config.database.pass,
  synchronize: false,
  migrationsRun: true,
  logging: config.database.log,
  logger: new SimpleConsoleLogger(config.database.log),
  entities:
    config.environment === 'production'
      ? ['dist/core/**/entity/*.entity.js']
      : ['src/core/**/entity/*.entity.ts'],
  migrations:
    config.environment === 'production'
      ? ['dist/infra/database/migrations/*.js']
      : ['src/infra/database/migrations/*.ts']
})
