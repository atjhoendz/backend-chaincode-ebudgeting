import { Module } from '@nestjs/common';
import { AnggaranService } from './anggaran.service';
import { AnggaranController } from './anggaran.controller';
import { HlfConfig } from 'src/chaincodeService/hlfConfig';
import { ChainModule } from 'src/chaincodeService/chain.module';

@Module({
  controllers: [AnggaranController],
  providers: [AnggaranService],
  imports: [ChainModule, HlfConfig],
})
export class AnggaranModule {}
