export const config = {
  port: process.env.PORT || 5000,
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    name: process.env.DB_NAME || 'comunica',
    user: process.env.DB_USER || 'postgres',
    pass: process.env.DB_PASS || 'postgres',
    log: process.env.DB_LOG === 'false'
  }
}
