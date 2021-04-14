import { Logger, Module } from '@nestjs/common';
import { ChainModule } from './chaincode-service/chain.module';
import { HlfConfig } from './chaincode-service/hlfConfig';
import { UserModule } from './user/user.module';
import { ProvinsiModule } from './provinsi/provinsi.module';
import { KategoriModule } from './kategori/kategori.module';
import { LembagaModule } from './lembaga/lembaga.module';
import { AnggaranModule } from './anggaran/anggaran.module';
import { PmkModule } from './pmk/pmk.module';
import { PenomoranModule } from './penomoran/penomoran.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PemohonModule } from './pemohon/pemohon.module';
import { EstimasiModule } from './estimasi/estimasi.module';
import { BiayaRiilModule } from './biaya-riil/biaya-riil.module';
import { PerbandinganBiayaModule } from './perbandingan-biaya/perbandingan-biaya.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ChainModule,
    HlfConfig,
    UserModule,
    ProvinsiModule,
    KategoriModule,
    LembagaModule,
    AnggaranModule,
    PmkModule,
    PenomoranModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PemohonModule,
    EstimasiModule,
    BiayaRiilModule,
    PerbandinganBiayaModule,
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
