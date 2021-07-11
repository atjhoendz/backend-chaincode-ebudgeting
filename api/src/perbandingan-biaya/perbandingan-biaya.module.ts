import { Module } from '@nestjs/common';
import { ChainModule } from '../chaincode-service/chain.module';
import { HlfConfig } from '../chaincode-service/hlfConfig';
import { ResponseHelper } from '../helper/response.helper';
import { PerbandinganBiayaController } from './perbandingan-biaya.controller';
import { PerbandinganBiayaService } from './perbandingan-biaya.service';

@Module({
  controllers: [PerbandinganBiayaController],
  providers: [PerbandinganBiayaService, ResponseHelper],
  imports: [ChainModule, HlfConfig],
})
export class PerbandinganBiayaModule {}
