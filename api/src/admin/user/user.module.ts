import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ChainModule } from 'src/chaincodeService/chain.module';
import { HlfConfig } from 'src/chaincodeService/hlfConfig';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [ChainModule, HlfConfig],
})
export class UserModule {}
