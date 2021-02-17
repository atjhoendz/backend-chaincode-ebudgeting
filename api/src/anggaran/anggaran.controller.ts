import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseHelper } from 'src/helper/response.helper';
import { AnggaranDTO } from './anggaran.dto';
import { AnggaranService } from './anggaran.service';

@ApiTags('Anggaran')
@Controller('anggaran')
export class AnggaranController {
  constructor(
    private readonly anggaranService: AnggaranService,
    private responseHelper: ResponseHelper,
  ) {}

  @Post()
  async create(@Body() anggaranDTO: AnggaranDTO) {
    const result = await this.anggaranService.create(anggaranDTO);

    if (JSON.parse(result)) {
      return this.responseHelper.wrapResponse(
        true,
        201,
        '',
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
    const result = await this.anggaranService.findAll();

    return this.responseHelper.wrapResponse(
      true,
      200,
      result,
      'Data berhasil didapatkan.',
    );
  }

  @Get(':key')
  async findOne(@Param('key') key: string) {
    const result = await this.anggaranService.findOne(key);

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
  async update(@Param('key') key: string, @Body() anggaranDTO: AnggaranDTO) {
    const result = await this.anggaranService.update(key, anggaranDTO);

    if (JSON.parse(result)) {
      return this.responseHelper.wrapResponse(
        true,
        200,
        '',
        'Data berhasil diperbarui.',
      );
    }

    throw new NotFoundException(undefined, 'Data tidak ditemukan.');
  }

  @Delete(':key')
  async remove(@Param('key') key: string) {
    const result = await this.anggaranService.remove(key);

    if (JSON.parse(result)) {
      return this.responseHelper.wrapResponse(
        true,
        200,
        '',
        'Data berhasil dihapus.',
      );
    }

    throw new NotFoundException(undefined, 'Data tidak ditemukan.');
  }
}
