import { Logger, Module } from '@nestjs/common';
import { ChainModule } from './chaincodeService/chain.module';
import { HlfConfig } from './chaincodeService/hlfConfig';
import { UserModule } from './admin/user/user.module';
import { ProvinsiModule } from './admin/provinsi/provinsi.module';
import { KategoriModule } from './admin/kategori/kategori.module';

@Module({
  imports: [ChainModule, HlfConfig, UserModule, ProvinsiModule, KategoriModule],
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
