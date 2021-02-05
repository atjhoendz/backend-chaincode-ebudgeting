import { Test, TestingModule } from '@nestjs/testing';
import { KategoriController } from './kategori.controller';
import { KategoriService } from './kategori.service';

describe('KategoriController', () => {
  let controller: KategoriController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KategoriController],
      providers: [KategoriService],
    }).compile();

    controller = module.get<KategoriController>(KategoriController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
