import { Test, TestingModule } from '@nestjs/testing';
import { AppUtil } from 'src/chaincodeService/appUtil.service';
import { MockContract } from '../../test/mockService/mockContract';
import { HlfConfig } from '../../test/mockService/mockHlfConfig';
import { KategoriController } from './kategori.controller';
import { KategoriService } from './kategori.service';

describe('KategoriController', () => {
  let controller: KategoriController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KategoriController],
      providers: [KategoriService, HlfConfig, MockContract, AppUtil],
    }).compile();

    controller = module.get<KategoriController>(KategoriController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});