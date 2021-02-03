import { Test, TestingModule } from '@nestjs/testing';
import { ProvinsiService } from './provinsi.service';

describe('ProvinsiService', () => {
  let service: ProvinsiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProvinsiService],
    }).compile();

    service = module.get<ProvinsiService>(ProvinsiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
