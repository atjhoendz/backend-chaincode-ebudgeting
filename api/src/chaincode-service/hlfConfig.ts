import { Injectable } from '@nestjs/common';
import FabricCAServices from 'fabric-ca-client';
import { Contract, Gateway, Wallet } from 'fabric-network';

type ListContract = {
  User: Contract;
  Fabcar: Contract;
  Provinsi: Contract;
};

@Injectable()
export class HlfConfig {
  public ccp: any;
  public caClient: FabricCAServices;
  public wallet: Wallet;
  public gateway: Gateway;
  public contract: ListContract;
}
