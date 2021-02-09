import { Module } from '@nestjs/common';
import { PenomoranService } from './penomoran.service';
import { PenomoranController } from './penomoran.controller';
import { ChainModule } from 'src/chaincodeService/chain.module';
import { HlfConfig } from 'src/chaincodeService/hlfConfig';

@Module({
  controllers: [PenomoranController],
  providers: [PenomoranService],
  imports: [ChainModule, HlfConfig],
})
export class PenomoranModule {}
