import { Module } from '@nestjs/common';
import { KategoriService } from './kategori.service';
import { KategoriController } from './kategori.controller';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';
import { ChainModule } from 'src/chaincode-service/chain.module';

@Module({
  controllers: [KategoriController],
  providers: [KategoriService],
  imports: [ChainModule, HlfConfig],
})
export class KategoriModule {}
