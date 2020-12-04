import { Injectable, Logger } from '@nestjs/common';
import { AppUtil } from 'src/core/chain/appUtil.service';
import { HlfConfig } from 'src/core/chain/hlfConfig';
import { CarsDto } from './cars.model';

@Injectable()
export class CarsService {
  constructor(public hlfConfig: HlfConfig, public appUtil: AppUtil) {}
  create(carsDto: CarsDto) {
    return 'This action adds a new car';
  }

  async findAll() {
    const result = await this.hlfConfig.contract.evaluateTransaction(
      'queryAllCars',
    );
    return this.appUtil.prettyJSONString(result);
  }

  async findOne(carNumber: string) {
    const result = await this.hlfConfig.contract.evaluateTransaction(
      'queryCar',
      carNumber,
    );
    return this.appUtil.prettyJSONString(result);
  }

  update(id: number, carsDto: CarsDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
