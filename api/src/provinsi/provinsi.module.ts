import { Module } from '@nestjs/common';
import { ProvinsiService } from './provinsi.service';
import { ProvinsiController } from './provinsi.controller';
import { ChainModule } from '../chaincode-service/chain.module';
import { HlfConfig } from '../chaincode-service/hlfConfig';
import { ResponseHelper } from '../helper/response.helper';

@Module({
  controllers: [ProvinsiController],
  providers: [ProvinsiService, ResponseHelper],
  imports: [ChainModule, HlfConfig],
})
export class ProvinsiModule {}
