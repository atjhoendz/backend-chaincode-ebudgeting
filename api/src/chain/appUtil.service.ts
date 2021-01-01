import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { Wallets } from 'fabric-network';

@Injectable()
export class AppUtil {
  buildCCPOrg1() {
    const ccpPath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'network',
      'network-conf',
      'organizations',
      'peerOrganizations',
      'org1.example.com',
      'connection-org1.json',
    );

    const fileExists = fs.existsSync(ccpPath);

    if (!fileExists) {
      throw new Error(`no such file or directory: ${ccpPath}`);
    }

    const contents = fs.readFileSync(ccpPath, 'utf-8');

    const ccp = JSON.parse(contents);

    Logger.log(
      `Loaded the network configuration located at ${ccpPath}`,
      'Build CCP Org 1',
    );
    return ccp;
  }

  async buildWallet(walletPath: string) {
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    Logger.log(`Built a file system wallet at ${walletPath}`, 'Build Wallet');

    return wallet;
  }

  prettyJSONString(inputString: any) {
    if (inputString) {
      return JSON.stringify(JSON.parse(inputString), null, 2);
    } else {
      return inputString;
    }
  }
}
