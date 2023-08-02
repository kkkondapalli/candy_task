import * as process from 'process';
import app from './app';
import database from './database';

export default () => ({
  port: parseInt(process.env.APP_PORT) || 3000,
  database: database(process),
  app: app(process),
});
