import { Test, TestingModule } from '@nestjs/testing';
import { ProvinsiController } from './provinsi.controller';
import { ProvinsiService } from './provinsi.service';

describe('ProvinsiController', () => {
  let controller: ProvinsiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvinsiController],
      providers: [ProvinsiService],
    }).compile();

    controller = module.get<ProvinsiController>(ProvinsiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
