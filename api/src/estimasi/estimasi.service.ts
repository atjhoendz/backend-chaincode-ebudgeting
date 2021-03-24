import { Injectable, Logger } from '@nestjs/common';
import { AppUtil } from 'src/chaincodeService/appUtil.service';
import { HlfConfig } from 'src/chaincodeService/hlfConfig';
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
    const result = await this.hlfConfig.contract.evaluateTransaction(
      'getByKey',
      key,
    );

    return this.appUtil.prettyJSONString(result);
  }

  async update(key: string, estimasiDTO: EstimasiDTO) {
    try {
      console.table(key);
      console.table(estimasiDTO);
      const result = await this.hlfConfig.contract.submitTransaction(
        'updateByKey',
        key,
        JSON.stringify(estimasiDTO),
      );

      return this.appUtil.prettyJSONString(result);
    } catch (err) {
      console.log(`Catch error: ${err}`);
    }
  }

  async remove(key: string) {
    const result = await this.hlfConfig.contract.submitTransaction(
      'deleteByKey',
      key,
    );

    return this.appUtil.prettyJSONString(result);
  }
}
