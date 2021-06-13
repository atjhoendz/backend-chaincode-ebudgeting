import { Test, TestingModule } from '@nestjs/testing';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';
import { ResponseHelper } from 'src/helper/response.helper';
import { mockedHlfConfig } from '../../test/mockService/hlfConfig.mock';
import { PmkController } from './pmk.controller';
import { PmkService } from './pmk.service';

describe('PmkController', () => {
  let controller: PmkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PmkController],
      providers: [
        PmkService,
        AppUtil,
        ResponseHelper,
        {
          provide: HlfConfig,
          useValue: mockedHlfConfig,
        },
      ],
    }).compile();

    controller = module.get<PmkController>(PmkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
