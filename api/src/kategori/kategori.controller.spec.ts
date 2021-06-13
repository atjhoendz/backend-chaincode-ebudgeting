import { Test, TestingModule } from '@nestjs/testing';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';
import { ResponseHelper } from 'src/helper/response.helper';
import { mockedHlfConfig } from '../../test/mockService/hlfConfig.mock';
import { KategoriController } from './kategori.controller';
import { KategoriService } from './kategori.service';

describe('KategoriController', () => {
  let controller: KategoriController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KategoriController],
      providers: [
        KategoriService,
        AppUtil,
        ResponseHelper,
        {
          provide: HlfConfig,
          useValue: mockedHlfConfig,
        },
      ],
    }).compile();

    controller = module.get<KategoriController>(KategoriController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
