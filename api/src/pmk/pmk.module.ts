import { Module } from '@nestjs/common';
import { PmkService } from './pmk.service';
import { PmkController } from './pmk.controller';
import { ChainModule } from '../chaincode-service/chain.module';
import { HlfConfig } from '../chaincode-service/hlfConfig';
import { ResponseHelper } from '../helper/response.helper';

@Module({
  controllers: [PmkController],
  providers: [PmkService, ResponseHelper],
  imports: [ChainModule, HlfConfig],
})
export class PmkModule {}
