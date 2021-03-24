import { Test, TestingModule } from '@nestjs/testing';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { ResponseHelper } from 'src/helper/response.helper';
import { MockContract } from '../../test/mockService/mockContract';
import { HlfConfig } from '../../test/mockService/mockHlfConfig';
import { ProvinsiController } from './provinsi.controller';
import { ProvinsiService } from './provinsi.service';

describe('ProvinsiController', () => {
  let controller: ProvinsiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvinsiController],
      providers: [
        ProvinsiService,
        HlfConfig,
        MockContract,
        AppUtil,
        ResponseHelper,
      ],
    }).compile();

    controller = module.get<ProvinsiController>(ProvinsiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
