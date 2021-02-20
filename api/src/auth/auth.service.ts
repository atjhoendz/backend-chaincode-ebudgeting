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
      user[0]?.Record?.password,
      pass,
    );

    if (isPassValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { jabatan } = user[0].Record;
      return { Key: user[0].Key, jabatan };
    }

    return null;
  }

  async isPasswordValid(
    plainPass: string,
    hashedPass: string,
  ): Promise<boolean> {
    const result = await bcrypt.compare(hashedPass, plainPass);
    return result;
  }

  getCookieWithJwtAccessToken(user: any) {
    const payload: TokenPayload = {
      sub: user.Key,
      role: user.jabatan,
    };

    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_TIME'),
    });

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRES_TIME',
    )}`;
  }

  getCookieWithJwtRefreshToken(user: any) {
    const payload: TokenPayload = {
      sub: user.Key,
      role: user.jabatan,
    };

    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_TIME'),
    });

    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRES_TIME',
    )}`;

    return cookie;
  }

  getCookieForLogOut() {
    return [
      `Authentication=; HttpOnly; Path=/; Max-Age=0`,
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
}
