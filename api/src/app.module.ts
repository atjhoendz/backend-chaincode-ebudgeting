import { Logger, Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { ChainModule } from './chaincode-service/chain.module';
import { HlfConfig } from './chaincode-service/hlfConfig';
import { UserModule } from './admin/user/user.module';
import { ProvinsiModule } from './admin/provinsi/provinsi.module';

@Module({
  imports: [ChainModule, CarsModule, HlfConfig, UserModule, ProvinsiModule],
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
