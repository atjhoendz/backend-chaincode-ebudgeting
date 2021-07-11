import { Module } from '@nestjs/common';
import { AnggaranService } from './anggaran.service';
import { AnggaranController } from './anggaran.controller';
import { HlfConfig } from '../chaincode-service/hlfConfig';
import { ChainModule } from '../chaincode-service/chain.module';
import { ResponseHelper } from '../helper/response.helper';

@Module({
  controllers: [AnggaranController],
  providers: [AnggaranService, ResponseHelper],
  imports: [ChainModule, HlfConfig],
})
export class AnggaranModule {}
