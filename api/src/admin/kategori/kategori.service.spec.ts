import { Test, TestingModule } from '@nestjs/testing';
import { KategoriService } from './kategori.service';

describe('KategoriService', () => {
  let service: KategoriService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KategoriService],
    }).compile();

    service = module.get<KategoriService>(KategoriService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
