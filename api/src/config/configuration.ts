export default () => ({
  NODE_ENV: process.env.NODE_ENV || 'LOCAL',
  PORT: process.env.PORT || 3000,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET || 'secret',
  JWT_ACCESS_TOKEN_EXPIRES_TIME:
    process.env.JWT_ACCESS_TOKEN_EXPIRES_TIME || '15m',
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || 'secret',
  JWT_REFRESH_TOKEN_EXPIRES_TIME:
    process.env.JWT_REFRESH_TOKEN_EXPIRES_TIME || '7d',
  COOKIE_SAME_SITE: process.env.COOKIE_SAME_SITE || 'None',
});
