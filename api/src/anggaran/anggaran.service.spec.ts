import { Test, TestingModule } from '@nestjs/testing';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';
import { ResponseHelper } from 'src/helper/response.helper';
import { mockedHlfConfig } from '../../test/mockService/hlfConfig.mock';
import { AnggaranDTO } from './anggaran.dto';
import { AnggaranService } from './anggaran.service';

const mockData: AnggaranDTO = {
  docType: 'anggaran',
  nama_lembaga: 'asdasdasdasdas',
  sisa_anggaran: 12000000,
};

const mockState = {
  Key: 'keyState',
  Record: mockData,
};

describe('AnggaranService', () => {
  let service: AnggaranService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnggaranService,
        AppUtil,
        ResponseHelper,
        {
          provide: HlfConfig,
          useValue: mockedHlfConfig,
        },
      ],
    }).compile();

    service = module.get<AnggaranService>(AnggaranService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create a Data', () => {
    describe('If data successfully created', () => {
      beforeEach(() => {
        mockedHlfConfig.contract.submitTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify(true), 'utf-8'),
        );
      });
      it('should return true', async () => {
        const result = await service.create(mockData);
        expect(JSON.parse(result)).toEqual(true);
      });
    });

    describe('If something went wrong', () => {
      beforeEach(() => {
        mockedHlfConfig.contract.submitTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify(false), 'utf-8'),
        );
      });
      it('should return false', async () => {
        const result = await service.create(mockData);
        expect(JSON.parse(result)).toEqual(false);
      });
    });
  });

  describe('Find All Data', () => {
    describe('If any data exist', () => {
      const arrData: Array<any> = [mockState];
      beforeEach(() => {
        mockedHlfConfig.contract.evaluateTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify(arrData), 'utf-8'),
        );
      });
      it('should return an array of data', async () => {
        const result = await service.findAll();
        expect(JSON.parse(result)).toEqual(arrData);
      });
    });

    describe('If no existing data', () => {
      beforeEach(() => {
        mockedHlfConfig.contract.evaluateTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify([]), 'utf-8'),
        );
      });
      it('should return an empty array', async () => {
        const result = await service.findAll();
        expect(JSON.parse(result)).toEqual([]);
      });
    });
  });

  describe('Find a Data', () => {
    describe('If the data is exist', () => {
      beforeEach(() => {
        mockedHlfConfig.contract.evaluateTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify(mockData), 'utf-8'),
        );
      });
      it('should return an object of data', async () => {
        const result = await service.findOne(mockState.Key);
        expect(JSON.parse(result)).toEqual(mockData);
      });
    });

    describe('If the data is not exist', () => {
      beforeEach(() => {
        mockedHlfConfig.contract.evaluateTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify({}), 'utf-8'),
        );
      });
      it('should return an empty object', async () => {
        const result = await service.findOne(mockState.Key);
        expect(JSON.parse(result)).toEqual({});
      });
    });

    describe('If key argument is empty', () => {
      it('should throw an error', async () => {
        await expect(service.findOne('')).rejects.toThrowError(
          'Key argument is cannot be empty',
        );
      });
    });
  });

  describe('Update a Data', () => {
    describe('If data successfully updated', () => {
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

    describe('If something went wrong', () => {
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

    describe('If key argument is empty', () => {
      it('should throw an error', async () => {
        await expect(service.update('', mockData)).rejects.toThrowError(
          'Key argument is cannot be empty',
        );
      });
    });
  });

  describe('Remove a Data', () => {
    describe('If data successfully removed', () => {
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

    describe('If something went wrong', () => {
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

    describe('If key argument is empty', () => {
      it('should throw an error', async () => {
        await expect(service.remove('')).rejects.toThrowError(
          'Key argument is cannot be empty',
        );
      });
    });
  });
});
