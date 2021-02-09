import { Test, TestingModule } from '@nestjs/testing';
import { AppUtil } from 'src/chaincodeService/appUtil.service';
import { MockContract } from '../../test/mockService/mockContract';
import { HlfConfig } from '../../test/mockService/mockHlfConfig';
import { PmkController } from './pmk.controller';
import { PmkService } from './pmk.service';

describe('PmkController', () => {
  let controller: PmkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PmkController],
      providers: [PmkService, HlfConfig, MockContract, AppUtil],
    }).compile();

    controller = module.get<PmkController>(PmkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
