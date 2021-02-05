import { Injectable } from '@nestjs/common';
import { AppUtil } from 'src/chaincodeService/appUtil.service';
import { HlfConfig } from 'src/chaincodeService/hlfConfig';
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
    const result = await this.hlfConfig.contract.evaluateTransaction(
      'getByKey',
      key,
    );

    return this.appUtil.prettyJSONString(result);
  }

  async update(key: string, provinsiDto: ProvinsiDto) {
    const result = await this.hlfConfig.contract.submitTransaction(
      'updateByKey',
      key,
      JSON.stringify(provinsiDto),
    );

    return this.appUtil.prettyJSONString(result);
  }

  async remove(key: string) {
    const result = await this.hlfConfig.contract.submitTransaction(
      'deleteByKey',
      key,
    );

    return this.appUtil.prettyJSONString(result);
  }
}
