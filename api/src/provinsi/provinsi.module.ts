import { Module } from '@nestjs/common';
import { ProvinsiService } from './provinsi.service';
import { ProvinsiController } from './provinsi.controller';
import { ChainModule } from 'src/chaincodeService/chain.module';
import { HlfConfig } from 'src/chaincodeService/hlfConfig';
import { ResponseHelper } from 'src/helper/response.helper';

@Module({
  controllers: [ProvinsiController],
  providers: [ProvinsiService, ResponseHelper],
  imports: [ChainModule, HlfConfig],
})
export class ProvinsiModule {}
