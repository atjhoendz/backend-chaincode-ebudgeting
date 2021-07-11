import { BadRequestException, Injectable } from '@nestjs/common';
import { AppUtil } from '../chaincode-service/appUtil.service';
import { HlfConfig } from '../chaincode-service/hlfConfig';
import { PemohonDTO } from './pemohon.dto';

@Injectable()
export class PemohonService {
  constructor(private hlfConfig: HlfConfig, private appUtil: AppUtil) {}

  async create(pemohonDTO: PemohonDTO) {
    const result = await this.hlfConfig.contract.submitTransaction(
      'create',
      JSON.stringify(pemohonDTO),
    );

    return this.appUtil.prettyJSONString(result);
  }

  async findAll() {
    const result = await this.hlfConfig.contract.evaluateTransaction(
      'getByType',
      'pemohon',
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

  async update(key: string, pemohonDTO: PemohonDTO) {
    if (!key) throw new BadRequestException('Key argument is cannot be empty');

    const result = await this.hlfConfig.contract.submitTransaction(
      'updateByKey',
      key,
      JSON.stringify(pemohonDTO),
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
