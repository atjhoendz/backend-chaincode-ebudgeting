import { Module } from '@nestjs/common';
import { PemohonService } from './pemohon.service';
import { PemohonController } from './pemohon.controller';
import { ResponseHelper } from 'src/helper/response.helper';
import { ChainModule } from 'src/chaincode-service/chain.module';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';

@Module({
  providers: [PemohonService, ResponseHelper],
  controllers: [PemohonController],
  imports: [ChainModule, HlfConfig],
})
export class PemohonModule {}
