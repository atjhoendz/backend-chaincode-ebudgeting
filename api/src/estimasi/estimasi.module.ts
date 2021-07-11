import { Module } from '@nestjs/common';
import { EstimasiService } from './estimasi.service';
import { EstimasiController } from './estimasi.controller';
import { ResponseHelper } from '../helper/response.helper';
import { ChainModule } from '../chaincode-service/chain.module';
import { HlfConfig } from '../chaincode-service/hlfConfig';

@Module({
  providers: [EstimasiService, ResponseHelper],
  controllers: [EstimasiController],
  imports: [ChainModule, HlfConfig],
})
export class EstimasiModule {}
