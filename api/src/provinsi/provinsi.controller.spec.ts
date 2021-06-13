import { Test, TestingModule } from '@nestjs/testing';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';
import { ResponseHelper } from 'src/helper/response.helper';
import { mockedHlfConfig } from '../../test/mockService/hlfConfig.mock';
import { ProvinsiController } from './provinsi.controller';
import { ProvinsiService } from './provinsi.service';

describe('ProvinsiController', () => {
  let controller: ProvinsiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvinsiController],
      providers: [
        ProvinsiService,
        AppUtil,
        ResponseHelper,
        {
          provide: HlfConfig,
          useValue: mockedHlfConfig,
        },
      ],
    }).compile();

    controller = module.get<ProvinsiController>(ProvinsiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
