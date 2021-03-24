import { Test, TestingModule } from '@nestjs/testing';
import { LembagaController } from './lembaga.controller';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { HlfConfig } from '../../test/mockService/mockHlfConfig';
import { MockContract } from '../../test/mockService/mockContract';
import { LembagaService } from './lembaga.service';
import { ResponseHelper } from 'src/helper/response.helper';

describe('LembagaController', () => {
  let controller: LembagaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LembagaController],
      providers: [
        LembagaService,
        HlfConfig,
        AppUtil,
        MockContract,
        ResponseHelper,
      ],
    }).compile();

    controller = module.get<LembagaController>(LembagaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
