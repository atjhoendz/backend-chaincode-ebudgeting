import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../payload.model';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      // passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayload) {
    // const refreshToken = request?.cookies?.Refresh;
    const data = {
      userKey: payload.sub,
      role: payload.role,
    };

    return {
      data,
    };
  }
}
