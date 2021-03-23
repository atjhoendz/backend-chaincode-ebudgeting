import { Module } from '@nestjs/common';
import { EstimasiService } from './estimasi.service';
import { EstimasiController } from './estimasi.controller';
import { ResponseHelper } from 'src/helper/response.helper';
import { ChainModule } from 'src/chaincodeService/chain.module';
import { HlfConfig } from 'src/chaincodeService/hlfConfig';

@Module({
  providers: [EstimasiService, ResponseHelper],
  controllers: [EstimasiController],
  imports: [ChainModule, HlfConfig],
})
export class EstimasiModule {}
