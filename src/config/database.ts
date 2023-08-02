// this is configured only for mysql we can extend but for simplicity
export default (process: any) => ({
  host: process.env.DB_HOST || 'mysql',
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  database_test: 'testing',
  sync: process.env.NODE_ENV.toLowerCase() !== 'production',
});
