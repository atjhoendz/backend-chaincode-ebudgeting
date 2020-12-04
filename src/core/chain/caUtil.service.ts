import { Injectable, Logger } from '@nestjs/common';
import * as FabricCAServices from 'fabric-ca-client';
import { Wallet } from 'fabric-network';
import { Appconfig } from 'src/common/config/appconfig';

@Injectable()
export class CAUtil {
  buildCAClient(ccp: any, caHostName: string) {
    const caInfo = ccp.certificateAuthorities[caHostName];
    const caTLSCACerts = caInfo.tlsCACerts.pem;
    const caClient = new FabricCAServices(
      caInfo.url,
      { trustedRoots: caTLSCACerts, verify: false },
      caInfo.caName,
    );

    Logger.log(`Built a CA Client named ${caInfo.caName}`, 'CAUtil');
    return caClient;
  }

  async enrollAdmin(
    caClient: FabricCAServices,
    wallet: Wallet,
    orgMspId: string,
  ) {
    try {
      const identity = await wallet.get(Appconfig.hlf.admin.enrollmentID);
      if (identity) {
        Logger.log(
          'An identity for the admin user already exists in the wallet',
          'Enroll Admin',
        );
        return;
      }

      const enrollment = await caClient.enroll({
        enrollmentID: Appconfig.hlf.admin.enrollmentID,
        enrollmentSecret: Appconfig.hlf.admin.enrollmentSecret,
      });
      const x509Identity = {
        credentials: {
          certificate: enrollment.certificate,
          privateKey: enrollment.key.toBytes(),
        },
        mspId: orgMspId,
        type: 'X.509',
      };

      await wallet.put(Appconfig.hlf.admin.enrollmentID, x509Identity);
      Logger.log(
        'Successfully enrolled admin user and imported it into the wallet',
        'Enroll Admin',
      );
    } catch (error) {
      Logger.error(`Failed to enroll admin user : ${error}`);
    }
  }

  async registerAndEnrollUser(
    caClient: FabricCAServices,
    wallet: Wallet,
    orgMspId: string,
    userId: string,
    affiliation: string,
  ) {
    try {
      const userIdentity = await wallet.get(userId);
      if (userIdentity) {
        Logger.log(
          `An identity for the user ${userId} already exists in the wallet`,
          'CAUtil',
        );
        return;
      }

      const adminIdentity = await wallet.get(Appconfig.hlf.admin.enrollmentID);
      if (!adminIdentity) {
        Logger.log(
          'An identity for the admin user does not exist in the wallet',
          'CAUtil',
        );
        Logger.log('Enroll the admin user before retrying', 'CAUtil');
        return;
      }

      const provider = wallet
        .getProviderRegistry()
        .getProvider(adminIdentity.type);
      const adminUser = await provider.getUserContext(
        adminIdentity,
        Appconfig.hlf.admin.enrollmentID,
      );

      const secret = await caClient.register(
        {
          affiliation: affiliation,
          enrollmentID: userId,
          role: 'client',
        },
        adminUser,
      );

      const enrollment = await caClient.enroll({
        enrollmentID: userId,
        enrollmentSecret: secret,
      });

      const x509Identity = {
        credentials: {
          certificate: enrollment.certificate,
          privateKey: enrollment.key.toBytes(),
        },
        mspId: orgMspId,
        type: 'X.509',
      };

      await wallet.put(userId, x509Identity);
      Logger.log(
        `Successfully registered and enrolled user ${userId} and imported it into the wallet`,
        'CAUtil',
      );
    } catch (error) {
      Logger.error(`Failed to register user : ${error}`);
    }
  }
}
