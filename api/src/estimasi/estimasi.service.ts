import { BadRequestException, Injectable } from '@nestjs/common';
import { AppUtil } from '../chaincode-service/appUtil.service';
import { HlfConfig } from '../chaincode-service/hlfConfig';
import { EstimasiDTO } from './estimasi.dto';

@Injectable()
export class EstimasiService {
  constructor(private hlfConfig: HlfConfig, private appUtil: AppUtil) {}

  async create(estimasiDTO: EstimasiDTO) {
    const result = await this.hlfConfig.contract.submitTransaction(
      'create',
      JSON.stringify(estimasiDTO),
    );

    return this.appUtil.prettyJSONString(result);
  }

  async findAll() {
    const result = await this.hlfConfig.contract.evaluateTransaction(
      'getByType',
      'estimasi',
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

  async update(key: string, estimasiDTO: EstimasiDTO) {
    if (!key) throw new BadRequestException('Key argument is cannot be empty');

    const result = await this.hlfConfig.contract.submitTransaction(
      'updateByKey',
      key,
      JSON.stringify(estimasiDTO),
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
