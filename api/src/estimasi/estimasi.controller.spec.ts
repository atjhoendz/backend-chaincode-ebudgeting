import { Test, TestingModule } from '@nestjs/testing';
import { EstimasiController } from './estimasi.controller';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { ResponseHelper } from 'src/helper/response.helper';
import { MockContract } from '../../test/mockService/mockContract';
import { HlfConfig } from '../../test/mockService/mockHlfConfig';
import { EstimasiService } from './estimasi.service';

describe('EstimasiController', () => {
  let controller: EstimasiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstimasiController],
      providers: [
        EstimasiService,
        HlfConfig,
        MockContract,
        AppUtil,
        ResponseHelper,
      ],
    }).compile();

    controller = module.get<EstimasiController>(EstimasiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
