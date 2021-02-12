import { EnvConfig } from 'src/config/env';

export const jwtConstants = {
  secret: EnvConfig.JWT_SECRET,
  expiresIn: EnvConfig.JWT_EXPIRESTIME,
};
