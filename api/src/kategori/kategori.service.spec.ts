import { Test, TestingModule } from '@nestjs/testing';
import { AppUtil } from 'src/chaincodeService/appUtil.service';
import { MockContract } from '../../test/mockService/mockContract';
import { HlfConfig } from '../../test/mockService/mockHlfConfig';
import { KategoriService } from './kategori.service';

describe('KategoriService', () => {
  let service: KategoriService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KategoriService, HlfConfig, AppUtil, MockContract],
    }).compile();

    service = module.get<KategoriService>(KategoriService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});