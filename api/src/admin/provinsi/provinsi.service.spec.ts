import { Test, TestingModule } from '@nestjs/testing';
import { AppUtil } from 'src/chaincodeService/appUtil.service';
import { HlfConfig } from 'src/chaincodeService/hlfConfig';
import { ProvinsiService } from './provinsi.service';

describe('ProvinsiService', () => {
  let service: ProvinsiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProvinsiService, HlfConfig, AppUtil],
    }).compile();

    service = module.get<ProvinsiService>(ProvinsiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
