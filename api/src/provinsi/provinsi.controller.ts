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
import { ProvinsiService } from './provinsi.service';
import { ProvinsiDto } from './provinsi.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseHelper } from 'src/helper/response.helper';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@ApiTags('Provinsi')
@Controller('provinsi')
export class ProvinsiController {
  constructor(
    private readonly provinsiService: ProvinsiService,
    private responseHelper: ResponseHelper,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() provinsiDto: ProvinsiDto) {
    const result = await this.provinsiService.create(provinsiDto);

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
    const result = await this.provinsiService.findAll();

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
    const result = await this.provinsiService.findOne(key);

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
  async update(@Param('key') key: string, @Body() provinsiDto: ProvinsiDto) {
    const result = await this.provinsiService.update(key, provinsiDto);

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
    const result = await this.provinsiService.remove(key);

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
