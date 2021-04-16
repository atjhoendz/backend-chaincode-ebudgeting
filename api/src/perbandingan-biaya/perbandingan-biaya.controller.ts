import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ResponseHelper } from 'src/helper/response.helper';
import { PerbandinganBiayaService } from './perbandingan-biaya.service';

@ApiTags('Perbandingan Biaya')
@Controller('perbandingan-biaya')
export class PerbandinganBiayaController {
  constructor(
    private readonly perbandinganBiayaService: PerbandinganBiayaService,
    private responseHelper: ResponseHelper,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('biaya-riil/:key')
  async getDataBiayaRiilByNamaPemohon(@Param('key') key: string) {
    const result = await this.perbandinganBiayaService.getDataBiayaRiilByKeyPemohon(
      key,
    );

    if (Object.keys(result).length) {
      return this.responseHelper.wrapResponse(
        true,
        200,
        result,
        'Data berhasil didapatkan.',
      );
    }

    throw new NotFoundException(undefined, 'Data tidak tersedia.');
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':keyPemohon')
  async getDataPerbandingan(@Param('keyPemohon') keyPemohon: string) {
    try {
      const result = await this.perbandinganBiayaService.getDataPerbandingan(
        keyPemohon,
      );

      return this.responseHelper.wrapResponse(
        true,
        200,
        result,
        'Data berhasil didapatkan.',
      );
    } catch (err) {
      throw new NotFoundException(undefined, err.message);
    }
  }
}
