import { Module } from '@nestjs/common';
import { ProvinsiService } from './provinsi.service';
import { ProvinsiController } from './provinsi.controller';
import { ChainModule } from 'src/chaincode-service/chain.module';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';
import { ResponseHelper } from 'src/helper/response.helper';

@Module({
  controllers: [ProvinsiController],
  providers: [ProvinsiService, ResponseHelper],
  imports: [ChainModule, HlfConfig],
})
export class ProvinsiModule {}
