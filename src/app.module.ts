import { Logger, Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { ChainModule } from './core/chain/chain.module';
import { HlfConfig } from './core/chain/hlfConfig';

@Module({
  imports: [ChainModule, CarsModule, HlfConfig],
})
export class AppModule {
  constructor(chainModule: ChainModule) {
    chainModule
      .init()
      .then(() => {
        Logger.log('Application init successfuly', 'INIT');
      })
      .catch((err) => {
        Logger.error(`Application Init Failed ${err}`);
      });
  }
}
