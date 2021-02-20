import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/roles.guard';
import { AuthDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { JwtRefreshTokenGuard } from './guard/jwt-refresh-token.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() authDTO: AuthDTO,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      request.user,
    );

    const refreshTokenCookie = this.authService.getCookieWithJwtRefreshToken(
      request.user,
    );

    response.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

    return response.send({
      'access-token': accessTokenCookie.split(';')[0],
      'refresh-token': refreshTokenCookie.split(';')[0],
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res() res: Response) {
    res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());

    return res.sendStatus(200);
  }

  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('testing')
  getProfile(@Req() req) {
    return req.user;
  }

  @ApiCookieAuth()
  @UseGuards(JwtRefreshTokenGuard)
  @Get('refresh')
  async refreshToken(@Req() req: Request) {
    const accessToken = this.authService.getCookieWithJwtAccessToken(req.user);

    req.res.setHeader('Set-Cookie', accessToken);

    return req.user;
  }
}
