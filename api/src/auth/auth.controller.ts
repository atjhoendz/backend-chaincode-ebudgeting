import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Roles } from '../role/role.decorator';
import { Role } from '../role/role.enum';
import { RolesGuard } from '../role/roles.guard';
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
    const {
      accessToken,
      accessTokenCookie,
    } = this.authService.getCookieWithJwtAccessToken(request.user);

    const {
      refreshTokenCookie,
    } = this.authService.getCookieWithJwtRefreshToken(request.user);

    response.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

    return response.status(200).send({
      data: {
        accessToken: accessToken,
      },
      message: 'Login berhasil',
    });
  }

  @UseGuards()
  @Post('logout')
  async logout(@Res() res: Response) {
    res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());

    return res.sendStatus(200);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('testing')
  getProfile(@Req() req) {
    return req.user;
  }

  @ApiBearerAuth()
  @UseGuards(JwtRefreshTokenGuard)
  @Get('refresh')
  async refreshToken(@Req() req: Request) {
    const {
      accessToken,
      accessTokenCookie,
    } = this.authService.getCookieWithJwtAccessToken(req.user);

    req.res.setHeader('Set-Cookie', accessTokenCookie);

    return {
      data: {
        accessToken: accessToken,
      },
      message: 'Membuat akses token baru sukses',
    };
  }
}
