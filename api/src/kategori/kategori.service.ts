import { BadRequestException, Injectable } from '@nestjs/common';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';
import { KategoriDto } from './kategori.dto';

@Injectable()
export class KategoriService {
  constructor(private hlfConfig: HlfConfig, private appUtil: AppUtil) {}

  async create(kategoriDto: KategoriDto) {
    const result = await this.hlfConfig.contract.submitTransaction(
      'create',
      JSON.stringify(kategoriDto),
    );

    return this.appUtil.prettyJSONString(result);
  }

  async findAll() {
    const result = await this.hlfConfig.contract.evaluateTransaction(
      'getByType',
      'kategori',
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

  async update(key: string, kategoriDto: KategoriDto) {
    if (!key) throw new BadRequestException('Key argument is cannot be empty');

    const result = await this.hlfConfig.contract.submitTransaction(
      'updateByKey',
      key,
      JSON.stringify(kategoriDto),
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
