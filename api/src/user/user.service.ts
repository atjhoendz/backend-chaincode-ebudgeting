import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppUtil } from 'src/chaincodeService/appUtil.service';
import { HlfConfig } from 'src/chaincodeService/hlfConfig';
import { UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private hlfConfig: HlfConfig, private appUtil: AppUtil) {}
  async create(userDto: UserDto) {
    try {
      const hashedPassword = await bcrypt.hash(userDto.password, 10);
      userDto.password = hashedPassword;
    } catch (err) {
      throw new HttpException(
        `Hash Password Error: ${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

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

  async findByQuery(key: string, value: string) {
    const query = JSON.stringify({
      [key]: value,
    });

    const result = await this.hlfConfig.contract.evaluateTransaction(
      'getByQuery',
      query,
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
