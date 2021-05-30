import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';
import { UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { UpdatePwdDTO } from './updatePwd.dto';

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
    if (!key) throw new BadRequestException('Key is required');
    const result = await this.hlfConfig.contract.evaluateTransaction(
      'getByKey',
      key,
    );
    return this.appUtil.prettyJSONString(result);
  }

  async findByQuery(key: string, value: string) {
    if (!key || !value)
      throw new BadRequestException('Key or Value is cannot be empty');

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
    if (!key || !userDto)
      throw new BadRequestException('Key or user data cannot be empty');

    const result = await this.hlfConfig.contract.submitTransaction(
      'updateByKey',
      key,
      JSON.stringify(userDto),
    );

    return this.appUtil.prettyJSONString(result);
  }

  async updatePassword(key: string, updatePwdDTO: UpdatePwdDTO) {
    let dataDB = await this.findOne(key);

    if (!Object.keys(JSON.parse(dataDB)).length) {
      throw new Error('Data tidak ditemukan.');
    }

    dataDB = JSON.parse(dataDB);

    try {
      const hashedPassword = await bcrypt.hash(updatePwdDTO.password, 10);

      updatePwdDTO.password = hashedPassword;

      const result = await this.update(key, updatePwdDTO);

      return this.appUtil.prettyJSONString(result);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
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
