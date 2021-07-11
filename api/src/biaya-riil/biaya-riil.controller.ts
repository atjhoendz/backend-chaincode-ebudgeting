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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ResponseHelper } from '../helper/response.helper';
import { BiayaRiilDTO } from './biaya-riil.dto';
import { BiayaRiilService } from './biaya-riil.service';

@ApiTags('Biaya Riil')
@Controller('biaya-riil')
export class BiayaRiilController {
  constructor(
    private readonly biayariilService: BiayaRiilService,
    private resposneHelper: ResponseHelper,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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
