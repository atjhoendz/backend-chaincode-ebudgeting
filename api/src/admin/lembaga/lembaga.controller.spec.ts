import { Test, TestingModule } from '@nestjs/testing';
import { LembagaController } from './lembaga.controller';
import { AppUtil } from 'src/chaincodeService/appUtil.service';
import { HlfConfig } from '../../../test/mockService/mockHlfConfig';
import { MockContract } from '../../../test/mockService/mockContract';
import { LembagaService } from './lembaga.service';

describe('LembagaController', () => {
  let controller: LembagaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LembagaController],
      providers: [LembagaService, HlfConfig, AppUtil, MockContract],
    }).compile();

    controller = module.get<LembagaController>(LembagaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
