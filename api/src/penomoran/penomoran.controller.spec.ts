import { Test, TestingModule } from '@nestjs/testing';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';
import { ResponseHelper } from 'src/helper/response.helper';
import { mockedHlfConfig } from '../../test/mockService/hlfConfig.mock';
import { PenomoranController } from './penomoran.controller';
import { PenomoranService } from './penomoran.service';

describe('PenomoranController', () => {
  let controller: PenomoranController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PenomoranController],
      providers: [
        PenomoranService,
        AppUtil,
        ResponseHelper,
        {
          provide: HlfConfig,
          useValue: mockedHlfConfig,
        },
      ],
    }).compile();

    controller = module.get<PenomoranController>(PenomoranController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
