import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ChainModule } from 'src/chaincode-service/chain.module';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';
import { ResponseHelper } from 'src/helper/response.helper';

@Module({
  controllers: [UserController],
  providers: [UserService, ResponseHelper],
  imports: [ChainModule, HlfConfig],
  exports: [UserService],
})
export class UserModule {}
