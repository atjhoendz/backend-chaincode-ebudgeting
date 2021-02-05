import { Module } from '@nestjs/common';
import { ProvinsiService } from './provinsi.service';
import { ProvinsiController } from './provinsi.controller';
import { ChainModule } from 'src/chaincodeService/chain.module';
import { HlfConfig } from 'src/chaincodeService/hlfConfig';

@Module({
  controllers: [ProvinsiController],
  providers: [ProvinsiService],
  imports: [ChainModule, HlfConfig],
})
export class ProvinsiModule {}
