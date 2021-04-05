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
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ResponseHelper } from 'src/helper/response.helper';
import { PmkDTO } from './pmk.dto';
import { PmkService } from './pmk.service';

@ApiTags('PMK')
@Controller('pmk')
export class PmkController {
  constructor(
    private readonly pmkService: PmkService,
    private responseHelper: ResponseHelper,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() pmkDTO: PmkDTO) {
    const result = await this.pmkService.create(pmkDTO);

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
    const result = await this.pmkService.findAll();

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
    const result = await this.pmkService.findOne(key);

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
  async update(@Param('key') key: string, @Body() pmkDTO: PmkDTO) {
    const result = await this.pmkService.update(key, pmkDTO);

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
    const result = await this.pmkService.remove(key);

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
