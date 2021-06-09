import { Test, TestingModule } from '@nestjs/testing';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { ResponseHelper } from 'src/helper/response.helper';
import { LembagaDto } from './lembaga.dto';
import { LembagaService } from './lembaga.service';
import { HlfConfig } from '../chaincode-service/hlfConfig';
import { mockedHlfConfig } from '../../test/mockService/hlfConfig.mock';
import { BiayaRiilDTO } from '../biaya-riil/biaya-riil.dto';
import { PemohonDTO } from '../pemohon/pemohon.dto';

const mockData: LembagaDto = {
  docType: 'lembaga',
  nama: 'FMIPA',
  jumlah_anggaran: 20000000,
};

const mockState = {
  Key: 'keyState',
  Record: mockData,
};

const mockDataPemohon: PemohonDTO = {
  alasan_ditolak: 'tidak ada',
  asal: 'cirebon',
  bukti_spd: 'Ada',
  docType: 'pemohon',
  golongan: 'aksjlakjs',
  jabatan: 'askjalwk',
  lama: '2 hari',
  maksud_perjalanan: 'Perjalanan Dinas',
  nama: 'armando',
  nama_lembaga: 'FMIPA',
  nip: '9210291820981029810298',
  nomor_spd: 'kajsdawi29ak2',
  status_berkas: 'Ada',
  status_spd: 'Diterima',
  tujuan: 'Silaturahmi',
};

const mockStatePemohon = {
  key: 'keyStatePemohon',
  ...mockDataPemohon,
};

const mockDataBiayaRiil: BiayaRiilDTO = {
  asal: 'Cirebon',
  banyak: '1',
  biaya: '10000000',
  bukti: 'Ada',
  data_pemohon: mockStatePemohon,
  docType: 'biaya-riil',
  jenis_pmk: 'jenisPMK',
  kategori_pmk: 'kategoriPMK',
  keterangan: 'keterangan',
  nama_lembaga: 'FMIPA',
  tanggal_berangkat: '20 Februari 2021',
  total: '10000000',
  tujuan: 'Jakarta',
};

const mockStateBiayaRiil = {
  Key: 'keyStateBiayaRiil',
  Record: mockDataBiayaRiil,
};

describe('LembagaService', () => {
  let service: LembagaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LembagaService,
        AppUtil,
        ResponseHelper,
        {
          provide: HlfConfig,
          useValue: mockedHlfConfig,
        },
      ],
    }).compile();

    service = module.get<LembagaService>(LembagaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Find all Data', () => {
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

  describe('Add a Data', () => {
    describe('If new data successfully created', () => {
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

  describe('Find a Data', () => {
    describe('If data is exist', () => {
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
      it('should throw an exception', async () => {
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
          'Key argument cannot be empty',
        );
      });
    });
  });

  describe('Delete a Data', () => {
    describe('If data successfully deleted', () => {
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

  describe('Get Data Biaya Riil by Lembaga', () => {
    describe('If data is exist', () => {
      beforeEach(() => {
        mockedHlfConfig.contract.evaluateTransaction.mockImplementation(
          (funcName: string, key: string) => {
            switch (funcName) {
              case 'getByKey':
                return Buffer.from(JSON.stringify(mockData), 'utf-8');
              case 'getByType':
                if (key == 'biaya-riil') {
                  const arrData: Array<any> = [mockStateBiayaRiil];
                  return Buffer.from(JSON.stringify(arrData), 'utf-8');
                }
                break;
              default:
                break;
            }
          },
        );
      });
      it('should return an object', async () => {
        const result = await service.getDataBiayaRiilByLembaga(mockState.Key);
        expect(result).toEqual({
          data_lembaga: expect.any(Object),
          data_kegiatan: expect.any(Object),
        });
      });
    });

    describe('If data is not exist', () => {
      beforeEach(() => {
        mockedHlfConfig.contract.evaluateTransaction.mockImplementation(
          (funcName: string, key: string) => {
            if (funcName == 'getByKey') {
              return Buffer.from(JSON.stringify({}), 'utf-8');
            }
          },
        );
      });
      it('should return an empty object', async () => {
        const result = await service.getDataBiayaRiilByLembaga(mockState.Key);
        expect(result).toEqual({});
      });
    });

    describe('If something went wrong', () => {
      beforeEach(() => {
        mockedHlfConfig.contract.evaluateTransaction.mockRejectedValue(
          new Error('error'),
        );
      });
      it('should throw an error', async () => {
        await expect(
          service.getDataBiayaRiilByLembaga(mockState.Key),
        ).rejects.toThrowError('error');
      });
    });

    describe('If key argument is empty', () => {
      it('should throw an error', async () => {
        await expect(
          service.getDataBiayaRiilByLembaga(''),
        ).rejects.toThrowError('Key argument cannot be empty');
      });
    });
  });
});
