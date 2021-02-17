import { Module } from '@nestjs/common';
import { PmkService } from './pmk.service';
import { PmkController } from './pmk.controller';
import { ChainModule } from 'src/chaincodeService/chain.module';
import { HlfConfig } from 'src/chaincodeService/hlfConfig';
import { ResponseHelper } from 'src/helper/response.helper';

@Module({
  controllers: [PmkController],
  providers: [PmkService, ResponseHelper],
  imports: [ChainModule, HlfConfig],
})
export class PmkModule {}
