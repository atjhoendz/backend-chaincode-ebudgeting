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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ResponseHelper } from '../helper/response.helper';
import { PenomoranDTO } from './penomoran.dto';
import { PenomoranService } from './penomoran.service';

@ApiTags('Penomoran')
@Controller('penomoran')
export class PenomoranController {
  constructor(
    private readonly penomoranService: PenomoranService,
    private responseHelper: ResponseHelper,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() penomoranDTO: PenomoranDTO) {
    const result = await this.penomoranService.create(penomoranDTO);

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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const result = await this.penomoranService.findAll();

    return this.responseHelper.wrapResponse(
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
    const result = await this.penomoranService.findOne(key);

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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':key')
  async update(@Param('key') key: string, @Body() penomoranDTO: PenomoranDTO) {
    const result = await this.penomoranService.update(key, penomoranDTO);

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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':key')
  async remove(@Param('key') key: string) {
    const result = await this.penomoranService.remove(key);

    if (JSON.parse(result)) {
      return this.responseHelper.wrapResponse(
        true,
        200,
        '',
        'Data berhasil dihapus',
      );
    }

    throw new NotFoundException(undefined, 'Data tidak ditemukan');
  }
}
