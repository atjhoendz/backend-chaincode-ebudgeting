import { Module } from '@nestjs/common';
import { PemohonService } from './pemohon.service';
import { PemohonController } from './pemohon.controller';
import { ResponseHelper } from 'src/helper/response.helper';
import { ChainModule } from 'src/chaincodeService/chain.module';
import { HlfConfig } from 'src/chaincodeService/hlfConfig';

@Module({
  providers: [PemohonService, ResponseHelper],
  controllers: [PemohonController],
  imports: [ChainModule, HlfConfig],
})
export class PemohonModule {}
