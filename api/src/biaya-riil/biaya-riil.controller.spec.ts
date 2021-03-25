import { Test, TestingModule } from '@nestjs/testing';
import { BiayaRiilController } from './biaya-riil.controller';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { ResponseHelper } from 'src/helper/response.helper';
import { MockContract } from '../../test/mockService/mockContract';
import { HlfConfig } from '../../test/mockService/mockHlfConfig';
import { BiayaRiilService } from './biaya-riil.service';

describe('BiayaRiilController', () => {
  let controller: BiayaRiilController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiayaRiilController],
      providers: [
        BiayaRiilService,
        HlfConfig,
        MockContract,
        ResponseHelper,
        AppUtil,
      ],
    }).compile();

    controller = module.get<BiayaRiilController>(BiayaRiilController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
