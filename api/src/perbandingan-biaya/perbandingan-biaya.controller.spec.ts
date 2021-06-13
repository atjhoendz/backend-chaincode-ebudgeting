import { Test, TestingModule } from '@nestjs/testing';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';
import { ResponseHelper } from 'src/helper/response.helper';
import { mockedHlfConfig } from '../../test/mockService/hlfConfig.mock';
import { PerbandinganBiayaController } from './perbandingan-biaya.controller';
import { PerbandinganBiayaService } from './perbandingan-biaya.service';

describe('PerbandinganBiayaController', () => {
  let controller: PerbandinganBiayaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerbandinganBiayaController],
      providers: [
        PerbandinganBiayaService,
        ResponseHelper,
        AppUtil,
        {
          provide: HlfConfig,
          useValue: mockedHlfConfig,
        },
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
