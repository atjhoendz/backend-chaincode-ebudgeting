import { Injectable } from '@nestjs/common';
import { MockContract } from './mockContract';

@Injectable()
export class HlfConfig {
  constructor(private mockContract: MockContract) {}
  public contract: any = this.mockContract;
}
