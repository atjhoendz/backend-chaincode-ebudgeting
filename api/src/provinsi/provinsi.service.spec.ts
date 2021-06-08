import { Test, TestingModule } from '@nestjs/testing';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { ResponseHelper } from 'src/helper/response.helper';
import { ProvinsiService } from './provinsi.service';
import { HlfConfig } from '../chaincode-service/hlfConfig';
import { mockedHlfConfig } from '../../test/mockService/hlfConfig.mock';
import { ProvinsiDto } from './provinsi.dto';

const mockDataProvinsi: ProvinsiDto = {
  docType: 'provinsi',
  nama: 'Jawa Barat',
};

const mockState = {
  Key: 'keyState',
  Record: mockDataProvinsi,
};

describe('ProvinsiService', () => {
  let service: ProvinsiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProvinsiService,
        AppUtil,
        ResponseHelper,
        {
          provide: HlfConfig,
          useValue: mockedHlfConfig,
        },
      ],
    }).compile();

    service = module.get<ProvinsiService>(ProvinsiService);
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
        const result = await service.create(mockDataProvinsi);
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
        const result = await service.create(mockDataProvinsi);
        expect(JSON.parse(result)).toEqual(false);
      });
    });
  });

  describe('Find All Data', () => {
    describe('If any data exist', () => {
      const arrData: Array<any> = [];
      beforeEach(() => {
        arrData.push(mockState);
        mockedHlfConfig.contract.evaluateTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify(arrData), 'utf-8'),
        );
      });
      it('should return array of data', async () => {
        const result = await service.findAll();
        expect(JSON.parse(result)).toEqual(arrData);
      });
    });

    describe('If no data exist', () => {
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

  describe('Find a Data By Key', () => {
    describe('If any data exist', () => {
      beforeEach(() => {
        mockedHlfConfig.contract.evaluateTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify(mockDataProvinsi), 'utf-8'),
        );
      });
      it('should return an object', async () => {
        const result = await service.findOne(mockState.Key);
        expect(JSON.parse(result)).toEqual(mockDataProvinsi);
      });
    });

    describe('If data is not exist', () => {
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
          'Key argument cannot be empty',
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
        const result = await service.update(mockState.Key, mockDataProvinsi);
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
        const result = await service.update(mockState.Key, mockDataProvinsi);
        expect(JSON.parse(result)).toEqual(false);
      });
    });

    describe('If key argument is empty', () => {
      it('should throw an error', async () => {
        await expect(service.update('', mockDataProvinsi)).rejects.toThrowError(
          'Key argument cannot be empty',
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
          'Key argument cannot be empty',
        );
      });
    });
  });
});
