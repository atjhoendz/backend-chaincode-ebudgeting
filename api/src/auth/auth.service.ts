import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './payload.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    let user = await this.userService.findByQuery('username', username);

    user = JSON.parse(user);

    if (!user.length) return null;

    const isPassValid = await this.isPasswordValid(
      pass,
      user[0]?.Record?.password,
    );

    if (isPassValid) {
      const { jabatan, username } = user[0].Record;
      return { Key: user[0].Key, Record: { jabatan, username } };
    }

    return null;
  }

  async isPasswordValid(
    plainPass: string,
    hashedPass: string,
  ): Promise<boolean> {
    const result = await bcrypt.compare(plainPass, hashedPass);
    return result;
  }

  getCookieWithJwtAccessToken(user: any) {
    const payload: TokenPayload = {
      sub: user.Key,
      role: user.Record.jabatan,
      username: user.Record.username,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_TIME'),
    });

    const accessTokenCookie = `Authentication=${accessToken}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRES_TIME',
    )}; SameSite=${this.configService.get('COOKIE_SAME_SITE')}`;

    return {
      accessToken,
      accessTokenCookie,
    };
  }

  getCookieWithJwtRefreshToken(user: any) {
    const payload: TokenPayload = {
      sub: user.Key,
      role: user.Record.jabatan,
      username: user.Record.username,
    };

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_TIME'),
    });

    const refreshTokenCookie = `Refresh=${refreshToken}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRES_TIME',
    )}; SameSite=${this.configService.get('COOKIE_SAME_SITE')}`;

    return {
      refreshToken,
      refreshTokenCookie,
    };
  }

  getCookieForLogOut() {
    return [
      `Authentication=; HttpOnly; Path=/; Max-Age=0`,
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
}
