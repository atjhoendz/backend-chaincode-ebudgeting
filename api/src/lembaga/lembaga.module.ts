import { Module } from '@nestjs/common';
import { LembagaService } from './lembaga.service';
import { LembagaController } from './lembaga.controller';
import { ChainModule } from 'src/chaincode-service/chain.module';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';
import { ResponseHelper } from 'src/helper/response.helper';

@Module({
  controllers: [LembagaController],
  providers: [LembagaService, ResponseHelper],
  imports: [ChainModule, HlfConfig],
})
export class LembagaModule {}
