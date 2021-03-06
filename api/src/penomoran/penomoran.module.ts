import { Module } from '@nestjs/common';
import { PenomoranService } from './penomoran.service';
import { PenomoranController } from './penomoran.controller';
import { ChainModule } from '../chaincode-service/chain.module';
import { HlfConfig } from '../chaincode-service/hlfConfig';
import { ResponseHelper } from '../helper/response.helper';

@Module({
  controllers: [PenomoranController],
  providers: [PenomoranService, ResponseHelper],
  imports: [ChainModule, HlfConfig],
})
export class PenomoranModule {}
