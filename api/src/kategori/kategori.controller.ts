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
import { KategoriDto } from './kategori.dto';
import { KategoriService } from './kategori.service';

@ApiTags('Kategori')
@Controller('kategori')
export class KategoriController {
  constructor(
    private readonly kategoriService: KategoriService,
    private responseHelper: ResponseHelper,
  ) {}

  @Post()
  async create(@Body() kategoriDto: KategoriDto) {
    const result = await this.kategoriService.create(kategoriDto);

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
    const result = await this.kategoriService.findAll();

    return this.responseHelper.wrapResponse(
      true,
      200,
      result,
      'Data berhasil didapatkan.',
    );
  }

  @Get(':key')
  async findOne(@Param('key') key: string) {
    const result = await this.kategoriService.findOne(key);

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
  async update(@Param('key') key: string, @Body() kategoriDto: KategoriDto) {
    const result = await this.kategoriService.update(key, kategoriDto);

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
    const result = await this.kategoriService.remove(key);

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
