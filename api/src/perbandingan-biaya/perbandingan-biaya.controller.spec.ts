import { Test, TestingModule } from '@nestjs/testing';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { ResponseHelper } from 'src/helper/response.helper';
import { MockContract } from '../../test/mockService/mockContract';
import { HlfConfig } from '../../test/mockService/mockHlfConfig';
import { PerbandinganBiayaController } from './perbandingan-biaya.controller';
import { PerbandinganBiayaService } from './perbandingan-biaya.service';

describe('PerbandinganBiayaController', () => {
  let controller: PerbandinganBiayaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerbandinganBiayaController],
      providers: [
        PerbandinganBiayaService,
        HlfConfig,
        MockContract,
        ResponseHelper,
        AppUtil,
      ],
    }).compile();

    controller = module.get<PerbandinganBiayaController>(
      PerbandinganBiayaController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
