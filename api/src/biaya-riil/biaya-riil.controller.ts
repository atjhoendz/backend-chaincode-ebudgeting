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
import { ResponseHelper } from 'src/helper/response.helper';
import { BiayaRiilDTO } from './biaya-riil.dto';
import { BiayaRiilService } from './biaya-riil.service';

@Controller('biaya-riil')
export class BiayaRiilController {
  constructor(
    private readonly biayariilService: BiayaRiilService,
    private resposneHelper: ResponseHelper,
  ) {}

  @Post()
  async create(@Body() biayariilDTO: BiayaRiilDTO) {
    const result = await this.biayariilService.create(biayariilDTO);

    if (JSON.parse(result)) {
      return this.resposneHelper.wrapResponse(
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
    const result = await this.biayariilService.findAll();

    return this.resposneHelper.wrapResponse(
      true,
      200,
      result,
      'Data berhasil didapatkan.',
    );
  }

  @Get(':key')
  async findOne(@Param('key') key: string) {
    const result = await this.biayariilService.findOne(key);

    if (Object.keys(JSON.parse(result)).length) {
      return this.resposneHelper.wrapResponse(
        true,
        200,
        result,
        'Data berhasil didapatkan.',
      );
    }

    throw new NotFoundException(undefined, 'Data tidak ditemukan');
  }

  @Put(':key')
  async update(@Param('key') key: string, @Body() biayariilDTO: BiayaRiilDTO) {
    const result = await this.biayariilService.update(key, biayariilDTO);

    if (JSON.parse(result)) {
      return this.resposneHelper.wrapResponse(
        true,
        200,
        '',
        'Data berhasil diperbarui.',
      );
    }

    throw new NotFoundException(
      undefined,
      'Data tidak ditemukan. Data tidak berhasil diperbarui.',
    );
  }

  @Delete(':key')
  async remove(@Param('key') key: string) {
    const result = await this.biayariilService.remove(key);

    if (JSON.parse(result)) {
      return this.resposneHelper.wrapResponse(
        true,
        200,
        '',
        'Data berhasil dihapus.',
      );
    }

    throw new NotFoundException(
      undefined,
      'Data tidak ditemukan. Data tidak berhasil dihapus.',
    );
  }
}
