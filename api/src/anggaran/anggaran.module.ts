import { Module } from '@nestjs/common';
import { AnggaranService } from './anggaran.service';
import { AnggaranController } from './anggaran.controller';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';
import { ChainModule } from 'src/chaincode-service/chain.module';
import { ResponseHelper } from 'src/helper/response.helper';

@Module({
  controllers: [AnggaranController],
  providers: [AnggaranService, ResponseHelper],
  imports: [ChainModule, HlfConfig],
})
export class AnggaranModule {}
