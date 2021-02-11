import { Test, TestingModule } from '@nestjs/testing';
import { AppUtil } from 'src/chaincodeService/appUtil.service';
import { MockContract } from '../../test/mockService/mockContract';
import { HlfConfig } from '../../test/mockService/mockHlfConfig';
import { PenomoranController } from './penomoran.controller';
import { PenomoranService } from './penomoran.service';

describe('PenomoranController', () => {
  let controller: PenomoranController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PenomoranController],
      providers: [PenomoranService, HlfConfig, MockContract, AppUtil],
    }).compile();

    controller = module.get<PenomoranController>(PenomoranController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});