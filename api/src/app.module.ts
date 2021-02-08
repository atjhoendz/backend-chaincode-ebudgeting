import { Logger, Module } from '@nestjs/common';
import { ChainModule } from './chaincodeService/chain.module';
import { HlfConfig } from './chaincodeService/hlfConfig';
import { UserModule } from './user/user.module';
import { ProvinsiModule } from './provinsi/provinsi.module';
import { KategoriModule } from './kategori/kategori.module';
import { LembagaModule } from './lembaga/lembaga.module';

@Module({
  imports: [
    ChainModule,
    HlfConfig,
    UserModule,
    ProvinsiModule,
    KategoriModule,
    LembagaModule,
  ],
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
