import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ChainModule } from '../chaincode-service/chain.module';
import { HlfConfig } from '../chaincode-service/hlfConfig';
import { ResponseHelper } from '../helper/response.helper';

@Module({
  controllers: [UserController],
  providers: [UserService, ResponseHelper],
  imports: [ChainModule, HlfConfig],
  exports: [UserService],
})
export class UserModule {}
