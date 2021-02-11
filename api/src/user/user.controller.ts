import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('User')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post()
  create(@Body() userDto: UserDto) {
    return this.UserService.create(userDto);
  }

  @Get()
  findAll() {
    return this.UserService.findAll();
  }

  @Get('find')
  findByQuery(@Query('type') type: string, @Query('value') value: string) {
    return this.UserService.findByQuery(type, value);
  }

  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.UserService.findOne(key);
  }

  @Put(':key')
  update(@Param('key') key: string, @Body() userDto: UserDto) {
    return this.UserService.update(key, userDto);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.UserService.remove(key);
  }
}
