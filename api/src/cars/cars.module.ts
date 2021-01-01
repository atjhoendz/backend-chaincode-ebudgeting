import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { HlfConfig } from 'src/chain/hlfConfig';
import { ChainModule } from 'src/chain/chain.module';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  imports: [ChainModule, HlfConfig],
})
export class CarsModule {}
