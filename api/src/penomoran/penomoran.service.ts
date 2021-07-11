import { BadRequestException, Injectable } from '@nestjs/common';
import { AppUtil } from '../chaincode-service/appUtil.service';
import { HlfConfig } from '../chaincode-service/hlfConfig';
import { PenomoranDTO } from './penomoran.dto';

@Injectable()
export class PenomoranService {
  constructor(private hlfConfig: HlfConfig, private appUtil: AppUtil) {}

  async create(penomoranDTO: PenomoranDTO) {
    const result = await this.hlfConfig.contract.submitTransaction(
      'create',
      JSON.stringify(penomoranDTO),
    );

    return this.appUtil.prettyJSONString(result);
  }

  async findAll() {
    const result = await this.hlfConfig.contract.evaluateTransaction(
      'getByType',
      'penomoran',
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

  async update(key: string, penomoranDTO: PenomoranDTO) {
    if (!key) throw new BadRequestException('Key argument is cannot be empty');

    const result = await this.hlfConfig.contract.submitTransaction(
      'updateByKey',
      key,
      JSON.stringify(penomoranDTO),
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
