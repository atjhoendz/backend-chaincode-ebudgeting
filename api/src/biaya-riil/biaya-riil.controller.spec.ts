import { Test, TestingModule } from '@nestjs/testing';
import { BiayaRiilController } from './biaya-riil.controller';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { ResponseHelper } from 'src/helper/response.helper';
import { BiayaRiilService } from './biaya-riil.service';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';
import { mockedHlfConfig } from '../../test/mockService/hlfConfig.mock';

describe('BiayaRiilController', () => {
  let controller: BiayaRiilController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiayaRiilController],
      providers: [
        BiayaRiilService,
        ResponseHelper,
        AppUtil,
        {
          provide: HlfConfig,
          useValue: mockedHlfConfig,
        },
      ],
    }).compile();

    controller = module.get<BiayaRiilController>(BiayaRiilController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
