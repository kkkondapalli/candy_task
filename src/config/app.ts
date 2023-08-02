export default (process: any) => ({
  app_secret: process.env.APP_SECRET,
  app_env: process.env.NODE_ENV,
  swagger: process.env.NODE_ENV.toLowerCase() !== 'production',
});
