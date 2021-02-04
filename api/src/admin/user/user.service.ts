import { Injectable } from '@nestjs/common';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(public hlfConfig: HlfConfig, public appUtil: AppUtil) {}
  async create(userDto: UserDto) {
    const result = await this.hlfConfig.contract.submitTransaction(
      'create',
      JSON.stringify(userDto),
    );
    return this.appUtil.prettyJSONString(result);
  }

  async findAll() {
    const result = await this.hlfConfig.contract.evaluateTransaction(
      'getByType',
      'user',
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

  async update(key: string, userDto: UserDto) {
    const result = await this.hlfConfig.contract.submitTransaction(
      'updateByKey',
      key,
      JSON.stringify(userDto),
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
