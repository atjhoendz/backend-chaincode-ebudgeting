import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseHelper } from 'src/helper/response.helper';
import { UpdatePwdDTO } from './updatePwd.dto';

@ApiTags('User')
@Controller('User')
export class UserController {
  constructor(
    private readonly UserService: UserService,
    private responseHelper: ResponseHelper,
  ) {}

  @Post()
  async create(@Body() userDto: UserDto) {
    const findResult = await this.UserService.findByQuery(
      'username',
      userDto.username,
    );

    if (JSON.parse(findResult).length) {
      throw new BadRequestException(undefined, 'Username sudah tersedia');
    }

    let result;
    try {
      result = await this.UserService.create(userDto);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }

    if (JSON.parse(result)) {
      return this.responseHelper.wrapResponse(
        true,
        201,
        {},
        'Data berhasil ditambahkan.',
      );
    }

    throw new InternalServerErrorException(
      undefined,
      'Data tidak berhasil ditambahkan.',
    );
  }

  @Get()
  async findAll() {
    const result = await this.UserService.findAll();

    return this.responseHelper.wrapResponse(
      true,
      200,
      result,
      'Data berhasil didapatkan.',
    );
  }

  @Get('find')
  async findByQuery(
    @Query('type') type: string,
    @Query('value') value: string,
  ) {
    const result = await this.UserService.findByQuery(type, value);

    if (JSON.parse(result).length) {
      return this.responseHelper.wrapResponse(
        true,
        200,
        result,
        'Data berhasil didapatkan.',
      );
    }

    throw new NotFoundException(undefined, 'Data tidak ditemukan.');
  }

  @Get(':key')
  async findOne(@Param('key') key: string) {
    const result = await this.UserService.findOne(key);

    if (Object.keys(JSON.parse(result)).length) {
      return this.responseHelper.wrapResponse(
        true,
        200,
        result,
        'Data berhasil didapatkan.',
      );
    }

    throw new NotFoundException(undefined, 'Data tidak ditemukan.');
  }

  @Put(':key')
  async update(@Param('key') key: string, @Body() userDto: UserDto) {
    const result = await this.UserService.update(key, userDto);

    if (result) {
      return this.responseHelper.wrapResponse(
        true,
        200,
        {},
        'Data berhasil diperbarui.',
      );
    }

    throw new NotFoundException(undefined, 'Data tidak ditemukan.');
  }

  @Put('password/:key')
  async updatePassword(
    @Param('key') key: string,
    @Body() updatePwdDTO: UpdatePwdDTO,
  ) {
    try {
      const result = await this.UserService.updatePassword(key, updatePwdDTO);

      if (result) {
        return this.responseHelper.wrapResponse(
          true,
          200,
          {},
          'Password berhasil diperbarui.',
        );
      }
      throw new BadRequestException(undefined, 'Password lama tidak sesuai.');
    } catch (err) {
      throw new NotFoundException(undefined, err.message);
    }
  }

  @Delete(':key')
  async remove(@Param('key') key: string) {
    const result = await this.UserService.remove(key);

    if (JSON.parse(result)) {
      return this.responseHelper.wrapResponse(
        true,
        200,
        {},
        'Data berhasil dihapus.',
      );
    }

    throw new NotFoundException(undefined, 'Data tidak ditemukan.');
  }
}
