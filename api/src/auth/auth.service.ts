import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /*
   * TODO
   * Using bcrypt for validate password
   */

  async validateUser(username: string, pass: string): Promise<any> {
    let user = await this.userService.findByQuery('username', username);

    user = JSON.parse(user);

    if (user.length && user[0]?.Record?.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...Record } = user[0].Record;
      return { Key: user[0].Key, Record };
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.Record.username, sub: user.Key };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
