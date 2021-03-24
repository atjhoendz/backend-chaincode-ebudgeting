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
import { EstimasiDTO } from './estimasi.dto';
import { EstimasiService } from './estimasi.service';

@ApiTags('Estimasi')
@Controller('estimasi')
export class EstimasiController {
  constructor(
    private readonly estimasiService: EstimasiService,
    private responseHelper: ResponseHelper,
  ) {}

  @Post()
  async create(@Body() estimasiDTO: EstimasiDTO) {
    const result = await this.estimasiService.create(estimasiDTO);

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
    const result = await this.estimasiService.findAll();

    return this.responseHelper.wrapResponse(
      true,
      200,
      result,
      'Data berhasil didapatkan.',
    );
  }

  @Get(':key')
  async findOne(@Param('key') key: string) {
    const result = await this.estimasiService.findOne(key);

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
  async update(@Param('key') key: string, @Body() estimasiDTO: EstimasiDTO) {
    const result = await this.estimasiService.update(key, estimasiDTO);

    if (JSON.parse(result)) {
      return this.responseHelper.wrapResponse(
        true,
        200,
        '',
        'Data berhasil diperbarui.',
      );
    }

    throw new NotFoundException(
      undefined,
      'Data tidak ditemukan. Tidak berhasil diperbarui.',
    );
  }

  @Delete(':key')
  async remove(@Param('key') key: string) {
    const result = await this.estimasiService.remove(key);

    if (JSON.parse(result)) {
      return this.responseHelper.wrapResponse(
        true,
        200,
        '',
        'Data berhasil dihapus.',
      );
    }

    throw new NotFoundException(
      undefined,
      'Data tidak ditemukan. Tidak berhasil dihapus.',
    );
  }
}
