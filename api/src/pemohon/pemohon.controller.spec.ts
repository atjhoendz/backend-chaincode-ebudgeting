import { Test, TestingModule } from '@nestjs/testing';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';
import { ResponseHelper } from 'src/helper/response.helper';
import { mockedHlfConfig } from '../../test/mockService/hlfConfig.mock';
import { PemohonController } from './pemohon.controller';
import { PemohonService } from './pemohon.service';

describe('PemohonController', () => {
  let controller: PemohonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PemohonController],
      providers: [
        PemohonService,
        AppUtil,
        ResponseHelper,
        {
          provide: HlfConfig,
          useValue: mockedHlfConfig,
        },
      ],
    }).compile();

    controller = module.get<PemohonController>(PemohonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
