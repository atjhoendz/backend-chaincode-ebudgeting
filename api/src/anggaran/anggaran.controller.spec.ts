import { Test, TestingModule } from '@nestjs/testing';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { ResponseHelper } from 'src/helper/response.helper';
import { MockContract } from '../../test/mockService/mockContract';
import { HlfConfig } from '../../test/mockService/mockHlfConfig';
import { AnggaranController } from './anggaran.controller';
import { AnggaranService } from './anggaran.service';

describe('AnggaranController', () => {
  let controller: AnggaranController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnggaranController],
      providers: [
        AnggaranService,
        HlfConfig,
        MockContract,
        AppUtil,
        ResponseHelper,
      ],
    }).compile();

    controller = module.get<AnggaranController>(AnggaranController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
