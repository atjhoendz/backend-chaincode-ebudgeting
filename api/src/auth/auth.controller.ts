import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/roles.guard';
import { AuthDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() authDTO: AuthDTO, @Req() req, @Res() response: Response) {
    const cookie = this.authService.getCookieWithJwtToken(req.user);
    response.setHeader('Set-Cookie', cookie);

    return response.send({ 'access-token': cookie });
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
  getProfile(@Request() req) {
    return req.user;
  }
}
