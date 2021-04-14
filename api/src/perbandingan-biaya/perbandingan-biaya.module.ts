import { Module } from '@nestjs/common';
import { ChainModule } from 'src/chaincode-service/chain.module';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';
import { ResponseHelper } from 'src/helper/response.helper';
import { PerbandinganBiayaController } from './perbandingan-biaya.controller';
import { PerbandinganBiayaService } from './perbandingan-biaya.service';

@Module({
  controllers: [PerbandinganBiayaController],
  providers: [PerbandinganBiayaService, ResponseHelper],
  imports: [ChainModule, HlfConfig],
})
export class PerbandinganBiayaModule {}
