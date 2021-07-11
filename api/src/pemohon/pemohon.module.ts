import { Module } from '@nestjs/common';
import { PemohonService } from './pemohon.service';
import { PemohonController } from './pemohon.controller';
import { ResponseHelper } from '../helper/response.helper';
import { ChainModule } from '../chaincode-service/chain.module';
import { HlfConfig } from '../chaincode-service/hlfConfig';

@Module({
  providers: [PemohonService, ResponseHelper],
  controllers: [PemohonController],
  imports: [ChainModule, HlfConfig],
})
export class PemohonModule {}
