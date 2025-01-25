export const config = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  cors: {
    origin: '*'
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    name: process.env.DB_NAME || 'comunica',
    user: process.env.DB_USER || 'postgres',
    pass: process.env.DB_PASS || 'postgres',
    log: process.env.DB_LOG === 'false'
  },
  token: {
    secret: process.env.TOKEN_SECRET || 'secret',
    cookie: 'comunica-in-token'
  }
}
