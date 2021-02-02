import { Injectable } from '@nestjs/common';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(public hlfConfig: HlfConfig, public appUtil: AppUtil) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = [
      createUserDto.username,
      createUserDto.nama_lengkap,
      createUserDto.password,
      createUserDto.nip,
      createUserDto.jabatan,
    ];
    const result = await this.hlfConfig.contractUser.submitTransaction(
      'create',
      ...newUser,
    );
    return this.appUtil.prettyJSONString(result);
  }

  async findAll() {
    const result = await this.hlfConfig.contractUser.evaluateTransaction(
      'getAll',
    );
    return this.appUtil.prettyJSONString(result);
  }

  async findOne(key: string) {
    const result = await this.hlfConfig.contractUser.evaluateTransaction(
      'getByKey',
      key,
    );
    return this.appUtil.prettyJSONString(result);
  }

  async update(key: string, updateUserDto: UpdateUserDto) {
    const updatedData = [
      updateUserDto.username,
      updateUserDto.nama_lengkap,
      updateUserDto.password,
      updateUserDto.nip,
      updateUserDto.jabatan,
    ];

    const result = await this.hlfConfig.contractUser.submitTransaction(
      'updateByKey',
      key,
      ...updatedData,
    );

    return this.appUtil.prettyJSONString(result);
  }

  async remove(key: string) {
    const result = await this.hlfConfig.contractUser.submitTransaction(
      'deleteByKey',
      key,
    );
    return this.appUtil.prettyJSONString(result);
  }
}
