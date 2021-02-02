import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('User')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.UserService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.UserService.findAll();
  }

  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.UserService.findOne(key);
  }

  @Put(':key')
  update(@Param('key') key: string, @Body() updateUserDto: UpdateUserDto) {
    return this.UserService.update(key, updateUserDto);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.UserService.remove(key);
  }
}
