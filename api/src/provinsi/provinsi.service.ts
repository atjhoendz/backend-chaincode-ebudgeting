import { BadRequestException, Injectable } from '@nestjs/common';
import { AppUtil } from '../chaincode-service/appUtil.service';
import { HlfConfig } from '../chaincode-service/hlfConfig';
import { ProvinsiDto } from './provinsi.dto';

@Injectable()
export class ProvinsiService {
  constructor(private hlfConfig: HlfConfig, private appUtil: AppUtil) {}
  async create(provinsiDto: ProvinsiDto) {
    const result = await this.hlfConfig.contract.submitTransaction(
      'create',
      JSON.stringify(provinsiDto),
    );

    return this.appUtil.prettyJSONString(result);
  }

  async findAll() {
    const result = await this.hlfConfig.contract.evaluateTransaction(
      'getByType',
      'provinsi',
    );

    return this.appUtil.prettyJSONString(result);
  }

  async findOne(key: string) {
    if (!key) throw new BadRequestException('Key argument cannot be empty');

    const result = await this.hlfConfig.contract.evaluateTransaction(
      'getByKey',
      key,
    );

    return this.appUtil.prettyJSONString(result);
  }

  async update(key: string, provinsiDto: ProvinsiDto) {
    if (!key) throw new BadRequestException('Key argument cannot be empty');

    const result = await this.hlfConfig.contract.submitTransaction(
      'updateByKey',
      key,
      JSON.stringify(provinsiDto),
    );

    return this.appUtil.prettyJSONString(result);
  }

  async remove(key: string) {
    if (!key) throw new BadRequestException('Key argument cannot be empty');

    const result = await this.hlfConfig.contract.submitTransaction(
      'deleteByKey',
      key,
    );

    return this.appUtil.prettyJSONString(result);
  }
}
