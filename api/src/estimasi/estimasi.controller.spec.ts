import { Test, TestingModule } from '@nestjs/testing';
import { EstimasiController } from './estimasi.controller';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { ResponseHelper } from 'src/helper/response.helper';
import { EstimasiService } from './estimasi.service';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';
import { mockedHlfConfig } from '../../test/mockService/hlfConfig.mock';

describe('EstimasiController', () => {
  let controller: EstimasiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstimasiController],
      providers: [
        EstimasiService,
        AppUtil,
        ResponseHelper,
        {
          provide: HlfConfig,
          useValue: mockedHlfConfig,
        },
      ],
    }).compile();

    controller = module.get<EstimasiController>(EstimasiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
