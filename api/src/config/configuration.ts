export default () => ({
  NODE_ENV: process.env.NODE_ENV || 'LOCAL',
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  JWT_EXPIRESTIME: process.env.JWT_EXPIRESTIME || '120s',
});
