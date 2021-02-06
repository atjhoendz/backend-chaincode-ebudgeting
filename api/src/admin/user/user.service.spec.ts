import { Test, TestingModule } from '@nestjs/testing';
import { AppUtil } from 'src/chaincodeService/appUtil.service';
import { MockContract } from '../../../test/mockService/mockContract';
import { HlfConfig } from '../../../test/mockService/mockHlfConfig';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

const mockData: UserDto = {
  docType: 'user',
  username: 'testUsername',
  nama_lengkap: 'test nama lengkap',
  password: '123456',
  nip: '12341242141211421',
  jabatan: 'Admin',
};

const mockState = {
  Key: expect.any(String),
  Record: mockData,
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, AppUtil, HlfConfig, MockContract],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Find all data', () => {
    it('should return empty array for empty data', async () => {
      const result = await service.findAll();

      expect(result).toEqual('[]');
    });

    it('should return array of json object if data exist', async () => {
      await service.create(mockData);

      const result = await service.findAll();

      expect(JSON.parse(result)[0]).toEqual(mockState);
    });
  });

  describe('Add a data', () => {
    it('should return a message if success', async () => {
      const result = await service.create(mockData);

      expect(result).toEqual('Data berhasil ditambahkan');
    });

    /*
     * Todo:
     * check if props data is not complete
     */
  });

  describe('Find spesific data', () => {
    it('should return object if data is exist', async () => {
      await service.create(mockData);
      const resultAll = await service.findAll();

      const key = JSON.parse(resultAll)[0].Key;

      const result = await service.findOne(key);

      expect(JSON.parse(result)).toEqual(mockData);
    });

    it('should return msg if data is not exist', async () => {
      const result = await service.findOne(mockState.Key);

      expect(result).toEqual('Data tidak tersedia');
    });
  });
});
