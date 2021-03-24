import { Test, TestingModule } from '@nestjs/testing';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { ResponseHelper } from 'src/helper/response.helper';
import { MockContract } from '../../test/mockService/mockContract';
import { HlfConfig } from '../../test/mockService/mockHlfConfig';
import { PemohonController } from './pemohon.controller';
import { PemohonService } from './pemohon.service';

describe('PemohonController', () => {
  let controller: PemohonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PemohonController],
      providers: [
        PemohonService,
        HlfConfig,
        MockContract,
        AppUtil,
        ResponseHelper,
      ],
    }).compile();

    controller = module.get<PemohonController>(PemohonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
