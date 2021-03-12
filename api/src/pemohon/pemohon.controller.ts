import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseHelper } from 'src/helper/response.helper';
import { PemohonDTO } from './pemohon.dto';
import { PemohonService } from './pemohon.service';

@ApiTags('Pemohon')
@Controller('pemohon')
export class PemohonController {
  constructor(
    private readonly pemohonService: PemohonService,
    private responseHelper: ResponseHelper,
  ) {}

  @Post()
  async create(@Body() pemohonDTO: PemohonDTO) {
    const result = await this.pemohonService.create(pemohonDTO);

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
    const result = await this.pemohonService.findAll();

    return this.responseHelper.wrapResponse(
      true,
      200,
      result,
      'Data berhasil didapatkan.',
    );
  }

  @Get(':key')
  async findOne(@Param('key') key: string) {
    const result = await this.pemohonService.findOne(key);

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
  async update(@Param('key') key: string, @Body() pemohonDTO: PemohonDTO) {
    const result = await this.pemohonService.update(key, pemohonDTO);

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
    const result = await this.pemohonService.remove(key);

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
