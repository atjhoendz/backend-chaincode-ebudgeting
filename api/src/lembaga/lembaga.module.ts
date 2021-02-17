import { Module } from '@nestjs/common';
import { LembagaService } from './lembaga.service';
import { LembagaController } from './lembaga.controller';
import { ChainModule } from 'src/chaincodeService/chain.module';
import { HlfConfig } from 'src/chaincodeService/hlfConfig';
import { ResponseHelper } from 'src/helper/response.helper';

@Module({
  controllers: [LembagaController],
  providers: [LembagaService, ResponseHelper],
  imports: [ChainModule, HlfConfig],
})
export class LembagaModule {}
