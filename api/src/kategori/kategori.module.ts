import { Module } from '@nestjs/common';
import { KategoriService } from './kategori.service';
import { KategoriController } from './kategori.controller';
import { HlfConfig } from '../chaincode-service/hlfConfig';
import { ChainModule } from '../chaincode-service/chain.module';
import { ResponseHelper } from '../helper/response.helper';

@Module({
  controllers: [KategoriController],
  providers: [KategoriService, ResponseHelper],
  imports: [ChainModule, HlfConfig],
})
export class KategoriModule {}
