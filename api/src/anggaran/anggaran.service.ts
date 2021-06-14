import { BadRequestException, Injectable } from '@nestjs/common';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';
import { AnggaranDTO } from './anggaran.dto';

@Injectable()
export class AnggaranService {
  constructor(private hlfConfig: HlfConfig, private appUtil: AppUtil) {}
  async create(anggaranDto: AnggaranDTO) {
    const result = await this.hlfConfig.contract.submitTransaction(
      'create',
      JSON.stringify(anggaranDto),
    );

    return this.appUtil.prettyJSONString(result);
  }

  async findAll() {
    const result = await this.hlfConfig.contract.evaluateTransaction(
      'getByType',
      'anggaran',
    );

    return this.appUtil.prettyJSONString(result);
  }

  async findOne(key: string) {
    if (!key) throw new BadRequestException('Key argument is cannot be empty');

    const result = await this.hlfConfig.contract.evaluateTransaction(
      'getByKey',
      key,
    );

    return this.appUtil.prettyJSONString(result);
  }

  async update(key: string, anggaranDTO: AnggaranDTO) {
    if (!key) throw new BadRequestException('Key argument is cannot be empty');

    const result = await this.hlfConfig.contract.submitTransaction(
      'updateByKey',
      key,
      JSON.stringify(anggaranDTO),
    );

    return this.appUtil.prettyJSONString(result);
  }

  async remove(key: string) {
    if (!key) throw new BadRequestException('Key argument is cannot be empty');

    const result = await this.hlfConfig.contract.submitTransaction(
      'deleteByKey',
      key,
    );

    return this.appUtil.prettyJSONString(result);
  }
}
