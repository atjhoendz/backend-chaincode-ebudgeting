import { Logger, Module } from '@nestjs/common';
import { Gateway } from 'fabric-network';
import { CAUtil } from './caUtil.service';
import { AppUtil } from './appUtil.service';
import { HlfConfig } from './hlfConfig';
import { Appconfig } from '../common/config/appconfig';

@Module({
  providers: [CAUtil, AppUtil, HlfConfig],
  exports: [CAUtil, AppUtil, ChainModule, HlfConfig],
})
export class ChainModule {
  constructor(
    public caUtil: CAUtil,
    public appUtil: AppUtil,
    public hlfConfig: HlfConfig,
  ) {}

  async init() {
    try {
      this.hlfConfig.ccp = this.appUtil.buildCCPOrg1();

      this.hlfConfig.caClient = this.caUtil.buildCAClient(
        this.hlfConfig.ccp,
        Appconfig.hlf.caHostName,
      );

      this.hlfConfig.wallet = await this.appUtil.buildWallet(
        Appconfig.hlf.walletPath,
      );

      await this.caUtil.enrollAdmin(
        this.hlfConfig.caClient,
        this.hlfConfig.wallet,
        Appconfig.hlf.admin.MspID,
      );

      await this.caUtil.registerAndEnrollUser(
        this.hlfConfig.caClient,
        this.hlfConfig.wallet,
        Appconfig.hlf.admin.MspID,
        Appconfig.hlf.org1UserId,
        'org1.department1',
      );

      this.hlfConfig.gateway = new Gateway();

      try {
        await this.hlfConfig.gateway.connect(this.hlfConfig.ccp, {
          wallet: this.hlfConfig.wallet,
          identity: Appconfig.hlf.org1UserId,
          discovery: { enabled: true, asLocalhost: true },
        });

        const network = await this.hlfConfig.gateway.getNetwork(
          Appconfig.hlf.channelId,
        );

        const fabcarContract = await network.getContract(
          Appconfig.hlf.chaincodeId,
          'FabCar',
        );

        const userContract = await network.getContract(
          Appconfig.hlf.chaincodeId,
          'User',
        );

        const provinsiContract = await network.getContract(
          Appconfig.hlf.chaincodeId,
          'Provinsi',
        );

        this.hlfConfig.contract = {
          Fabcar: fabcarContract,
          User: userContract,
          Provinsi: provinsiContract,
        };

        // const result = await this.hlfConfig.contract.evaluateTransaction(
        //   'queryAllCars',
        // );

        // Logger.log(
        //   `*** Result: ${this.appUtil.prettyJSONString(result)}`,
        //   'RESULT QUERY',
        // );
      } catch (error) {
        Logger.error(`Error: ${error}`);
      }
    } catch (error) {
      Logger.error(`FAILED to run the application: ${error}`);
    }
  }
}
