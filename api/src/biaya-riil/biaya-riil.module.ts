import { Module } from '@nestjs/common';
import { BiayaRiilService } from './biaya-riil.service';
import { BiayaRiilController } from './biaya-riil.controller';
import { ResponseHelper } from 'src/helper/response.helper';
import { ChainModule } from 'src/chaincode-service/chain.module';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';

@Module({
  providers: [BiayaRiilService, ResponseHelper],
  controllers: [BiayaRiilController],
  imports: [ChainModule, HlfConfig],
})
export class BiayaRiilModule {}
