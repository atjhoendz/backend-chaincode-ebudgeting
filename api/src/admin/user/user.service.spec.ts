import { Test, TestingModule } from '@nestjs/testing';
import { AppUtil } from 'src/chaincodeService/appUtil.service';
import { HlfConfig } from 'src/chaincodeService/hlfConfig';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, AppUtil, HlfConfig],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Find all data', () => {
    // error on evaluate transaction
    it('should return empty array for empty data', async () => {
      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });
});
