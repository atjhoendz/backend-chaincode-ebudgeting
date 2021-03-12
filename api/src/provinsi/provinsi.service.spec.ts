import { Test, TestingModule } from '@nestjs/testing';
import { AppUtil } from 'src/chaincodeService/appUtil.service';
import { ResponseHelper } from 'src/helper/response.helper';
import { MockContract } from '../../test/mockService/mockContract';
import { HlfConfig } from '../../test/mockService/mockHlfConfig';
import { ProvinsiService } from './provinsi.service';

describe('ProvinsiService', () => {
  let service: ProvinsiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProvinsiService,
        HlfConfig,
        MockContract,
        AppUtil,
        ResponseHelper,
      ],
    }).compile();

    service = module.get<ProvinsiService>(ProvinsiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
