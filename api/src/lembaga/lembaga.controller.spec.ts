import { Test, TestingModule } from '@nestjs/testing';
import { LembagaController } from './lembaga.controller';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { LembagaService } from './lembaga.service';
import { ResponseHelper } from 'src/helper/response.helper';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';
import { mockedHlfConfig } from '../../test/mockService/hlfConfig.mock';

describe('LembagaController', () => {
  let controller: LembagaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LembagaController],
      providers: [
        LembagaService,
        AppUtil,
        ResponseHelper,
        {
          provide: HlfConfig,
          useValue: mockedHlfConfig,
        },
      ],
    }).compile();

    controller = module.get<LembagaController>(LembagaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
