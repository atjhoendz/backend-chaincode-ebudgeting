import { Test, TestingModule } from '@nestjs/testing';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';
import { ResponseHelper } from 'src/helper/response.helper';
import { mockedHlfConfig } from '../../test/mockService/hlfConfig.mock';
import { AnggaranController } from './anggaran.controller';
import { AnggaranService } from './anggaran.service';

describe('AnggaranController', () => {
  let controller: AnggaranController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnggaranController],
      providers: [
        AnggaranService,
        AppUtil,
        ResponseHelper,
        {
          provide: HlfConfig,
          useValue: mockedHlfConfig,
        },
      ],
    }).compile();

    controller = module.get<AnggaranController>(AnggaranController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
