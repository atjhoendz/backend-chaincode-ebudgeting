import { ConfigOptions } from './config.model';
import * as path from 'path';
import { EnvConfig } from './env';

export const Appconfig: ConfigOptions = {
  hlf: {
    walletPath: path.resolve(__dirname, 'wallet'),
    userId: 'admin',
    channelId: 'mychannel',
    chaincodeId: 'ebudgetingCC',
    networkUrl: `grpcs://${EnvConfig.PEER_HOST}:7051`,
    eventUrl: `grpcs://${EnvConfig.PEER_HOST}:7053`,
    ordererUrl: `grpcs://${EnvConfig.ORDERER_HOST}:7050`,
    caUrl: `https://${EnvConfig.CA_HOST}:7054`,
    admin: {
      enrollmentID: 'admin',
      enrollmentSecret: 'adminpw',
      MspID: 'Org1MSP',
    },
    tlsOptions: {
      trustedRoots: [`${EnvConfig.TRUSTEDROOTS_CAORG1}`],
      verify: false,
    },
    caName: 'ca-org1',
    caHostName: 'ca.org1.example.com',
    org1UserId: 'appUser',
  },
} as ConfigOptions;
