import { Injectable } from '@nestjs/common';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';
import { CreateProvinsiDto } from './dto/create-provinsi.dto';
import { UpdateProvinsiDto } from './dto/update-provinsi.dto';

@Injectable()
export class ProvinsiService {
  constructor(public hlfConfig: HlfConfig, public appUtil: AppUtil) {}
  async create(createProvinsiDto: CreateProvinsiDto) {
    const result = await this.hlfConfig.contract.Provinsi.submitTransaction(
      'create',
      createProvinsiDto.nama,
    );

    return this.appUtil.prettyJSONString(result);
  }

  async findAll() {
    const result = await this.hlfConfig.contract.Provinsi.evaluateTransaction(
      'getAll',
    );

    return this.appUtil.prettyJSONString(result);
  }

  findOne(id: number) {
    return `This action returns a #${id} provinsi`;
  }

  update(id: number, updateProvinsiDto: UpdateProvinsiDto) {
    return `This action updates a #${id} provinsi`;
  }

  remove(id: number) {
    return `This action removes a #${id} provinsi`;
  }
}
