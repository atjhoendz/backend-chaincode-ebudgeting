import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ChainModule } from 'src/chaincode-service/chain.module';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [ChainModule, HlfConfig],
})
export class UserModule {}
