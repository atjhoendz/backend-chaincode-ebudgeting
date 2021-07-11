import { Module } from '@nestjs/common';
import { BiayaRiilService } from './biaya-riil.service';
import { BiayaRiilController } from './biaya-riil.controller';
import { ResponseHelper } from '../helper/response.helper';
import { ChainModule } from '../chaincode-service/chain.module';
import { HlfConfig } from '../chaincode-service/hlfConfig';

@Module({
  providers: [BiayaRiilService, ResponseHelper],
  controllers: [BiayaRiilController],
  imports: [ChainModule, HlfConfig],
})
export class BiayaRiilModule {}
