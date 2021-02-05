import { Test, TestingModule } from '@nestjs/testing';
import { AppUtil } from 'src/chaincodeService/appUtil.service';
import { HlfConfig } from 'src/chaincodeService/hlfConfig';
import { ProvinsiController } from './provinsi.controller';
import { ProvinsiService } from './provinsi.service';

describe('ProvinsiController', () => {
  let controller: ProvinsiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvinsiController],
      providers: [ProvinsiService, HlfConfig, AppUtil],
    }).compile();

    controller = module.get<ProvinsiController>(ProvinsiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
