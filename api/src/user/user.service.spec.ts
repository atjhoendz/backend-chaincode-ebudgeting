import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { ResponseHelper } from '../helper/response.helper';
import { HlfConfig } from '../chaincode-service/hlfConfig';
import { AppUtil } from '../chaincode-service/appUtil.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from './user.dto';
import { mockedHlfConfig } from '../../test/mockService/hlfConfig.mock';

const mockData: UserDto = {
  docType: 'user',
  username: 'testUsername',
  nama_lengkap: 'test nama lengkap',
  password: '123456',
  nip: '12341242141211421',
  jabatan: 'Admin',
};

const mockState = {
  Key: 'thisiskey',
  Record: mockData,
};

jest.mock('bcrypt');

describe('UserService', () => {
  let service: UserService;
  let bcryptHash: jest.Mock;

  beforeEach(async () => {
    bcryptHash = jest.fn();
    (bcrypt.hash as jest.Mock) = bcryptHash;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        ResponseHelper,
        AppUtil,
        {
          provide: HlfConfig,
          useValue: mockedHlfConfig,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create a user', () => {
    beforeEach(() => {
      bcryptHash.mockResolvedValue('bcryptVal');
      mockedHlfConfig.contract.submitTransaction.mockResolvedValue(
        Buffer.from(String(true), 'utf-8'),
      );
    });
    it('should return true if new user successfully created', async () => {
      const createdUser = await service.create(mockData);
      expect(JSON.parse(createdUser)).toBeTruthy();
    });

    describe('If bcrypt error on hash', () => {
      beforeEach(() => {
        bcryptHash.mockRejectedValue('Something wrong');
      });
      it('should throw an error exception', async () => {
        await expect(service.create(mockData)).rejects.toThrowError(
          'Hash Password Error: Something wrong',
        );
      });
    });
  });

  describe('Find All User Data', () => {
    const arrOfUser: Array<Record<string, any>> = [];
    beforeEach(() => {
      arrOfUser.push(mockState);
      const jsonString = JSON.stringify(arrOfUser);
      const dataInBuffer = Buffer.from(jsonString, 'utf-8');
      mockedHlfConfig.contract.evaluateTransaction.mockResolvedValue(
        dataInBuffer,
      );
    });
    it('should return array of state data', async () => {
      const fetchedUser = await service.findAll();
      expect(JSON.parse(fetchedUser)).toEqual(arrOfUser);
    });

    describe('If User Data Is Empty', () => {
      beforeEach(() => {
        mockedHlfConfig.contract.evaluateTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify([]), 'utf-8'),
        );
      });
      it('should return an empty array', async () => {
        const fetchedUser = await service.findAll();
        expect(JSON.parse(fetchedUser)).toEqual([]);
      });
    });
  });

  describe('Find One User by Key', () => {
    beforeEach(() => {
      mockedHlfConfig.contract.evaluateTransaction.mockResolvedValue(
        Buffer.from(JSON.stringify(mockData), 'utf-8'),
      );
    });
    it('should return a user data', async () => {
      const fetchedUser = await service.findOne(mockState.Key);
      expect(JSON.parse(fetchedUser)).toEqual(mockData);
    });

    describe('If user is not exist', () => {
      beforeEach(() => {
        mockedHlfConfig.contract.evaluateTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify({}), 'utf-8'),
        );
      });
      it('should return empty object', async () => {
        const fetchedUser = await service.findOne(mockState.Key);
        expect(JSON.parse(fetchedUser)).toEqual({});
      });
    });

    describe('If key is Empty', () => {
      it('should throw an exception', async () => {
        await expect(service.findOne('')).rejects.toThrowError(
          'Key is required',
        );
      });
    });
  });

  describe('Find By Query', () => {
    beforeEach(() => {
      mockedHlfConfig.contract.evaluateTransaction.mockResolvedValue(
        Buffer.from(JSON.stringify(mockData), 'utf-8'),
      );
    });
    it('should return user data', async () => {
      const fetchedUser = await service.findByQuery(
        'username',
        mockData.username,
      );
      expect(JSON.parse(fetchedUser)).toEqual(mockData);
    });

    describe('If user data is not exist', () => {
      beforeEach(() => {
        mockedHlfConfig.contract.evaluateTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify({}), 'utf-8'),
        );
      });
      it('should return empty object', async () => {
        const fetchedUser = await service.findByQuery(
          'username',
          mockData.username,
        );
        expect(JSON.parse(fetchedUser)).toEqual({});
      });
    });

    describe('If key or value is empty', () => {
      it('should throw an exception', async () => {
        await expect(
          service.findByQuery(undefined, undefined),
        ).rejects.toThrowError('Key or Value is cannot be empty');
      });
    });
  });

  describe('Update User Data', () => {
    describe('If Successfully Updated', () => {
      beforeEach(() => {
        mockedHlfConfig.contract.submitTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify(true), 'utf-8'),
        );
      });
      it('should return true', async () => {
        const result = await service.update(mockState.Key, mockData);
        expect(JSON.parse(result)).toEqual(true);
      });
    });

    describe('If user is not exist', () => {
      beforeEach(() => {
        mockedHlfConfig.contract.submitTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify(false), 'utf-8'),
        );
      });
      it('should return false', async () => {
        const result = await service.update(mockState.Key, mockData);
        expect(JSON.parse(result)).toEqual(false);
      });
    });

    describe('If Key or NewData value is empty', () => {
      it('should throw an exception', async () => {
        await expect(service.update(undefined, undefined)).rejects.toThrowError(
          'Key or user data cannot be empty',
        );
      });
    });
  });

  describe('Update User Password', () => {
    describe('If Successfully Updated', () => {
      beforeEach(() => {
        mockedHlfConfig.contract.evaluateTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify(mockData), 'utf-8'),
        );
        mockedHlfConfig.contract.submitTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify(true), 'utf-8'),
        );
        bcryptHash.mockReturnValue('bcryptVal');
      });
      it('should return true', async () => {
        const result = await service.updatePassword(mockState.Key, mockData);
        expect(JSON.parse(result)).toEqual(true);
      });
    });

    describe('If User Is Not Exist', () => {
      beforeEach(() => {
        mockedHlfConfig.contract.evaluateTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify({}), 'utf-8'),
        );
      });
      it('should throw an exception', async () => {
        await expect(
          service.updatePassword(mockState.Key, mockData),
        ).rejects.toThrowError('Data tidak ditemukan');
      });
    });

    describe('If Error On Update', () => {
      beforeEach(() => {
        mockedHlfConfig.contract.evaluateTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify(mockData), 'utf-8'),
        );
        bcryptHash.mockRejectedValue(new Error('Error something gone wrong'));
      });
      it('should throw an exception', async () => {
        await expect(
          service.updatePassword(mockState.Key, mockData),
        ).rejects.toThrowError('Error something gone wrong');
      });
    });
  });

  describe('Remove a User', () => {
    describe('If Successfully Removed', () => {
      beforeEach(() => {
        mockedHlfConfig.contract.submitTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify(true), 'utf-8'),
        );
      });
      it('should return true', async () => {
        const result = await service.remove(mockState.Key);
        expect(JSON.parse(result)).toEqual(true);
      });
    });

    describe('If User is Not Exist', () => {
      beforeEach(() => {
        mockedHlfConfig.contract.submitTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify(false), 'utf-8'),
        );
      });
      it('should return false', async () => {
        const result = await service.remove(mockState.Key);
        expect(JSON.parse(result)).toEqual(false);
      });
    });
  });
});
