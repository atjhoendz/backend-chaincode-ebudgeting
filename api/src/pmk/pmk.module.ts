import { Module } from '@nestjs/common';
import { PmkService } from './pmk.service';
import { PmkController } from './pmk.controller';
import { ChainModule } from 'src/chaincodeService/chain.module';
import { HlfConfig } from 'src/chaincodeService/hlfConfig';

@Module({
  controllers: [PmkController],
  providers: [PmkService],
  imports: [ChainModule, HlfConfig],
})
export class PmkModule {}
