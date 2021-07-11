import { Test, TestingModule } from '@nestjs/testing';
import { BiayaRiilService } from './biaya-riil.service';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { ResponseHelper } from 'src/helper/response.helper';
import { BiayaRiilDTO } from './biaya-riil.dto';
import { HlfConfig } from '../chaincode-service/hlfConfig';
import { mockedHlfConfig } from '../../test/mockService/hlfConfig.mock';
import { PemohonDTO } from '../pemohon/pemohon.dto';
import { AnggaranDTO } from '../anggaran/anggaran.dto';

const mockDataPemohon: PemohonDTO = {
  docType: 'pemohon',
  nomor_spd: 'nomorspd121241241',
  nip: '1928410298120921',
  nama: 'maman',
  golongan: 'contohGolongan',
  jabatan: 'contohJabatan',
  maksud_perjalanan: 'pekerjaan',
  asal: 'Bandung',
  tujuan: 'Jakarta',
  lama: '2 hari',
  bukti_spd: 'Ada',
  status_spd: 'Ada',
  status_berkas: 'Diterima',
  alasan_ditolak: '',
  nama_lembaga: 'FMIPA',
};

const mockStatePemohon = {
  key: 'keyPemohon',
  ...mockDataPemohon,
};

const mockData: BiayaRiilDTO = {
  docType: 'biaya-riil',
  data_pemohon: mockStatePemohon,
  tanggal_berangkat: '10/05/2020',
  biaya: '10000000',
  banyak: '2',
  keterangan: 'keterangan',
  kategori_pmk: 'kategoriPMK',
  jenis_pmk: 'jenisPMK',
  total: '20000000',
  bukti: 'Ada',
  asal: 'Bandung',
  tujuan: 'Jakarta',
  nama_lembaga: 'FMIPA',
};

const mockState = {
  Key: 'keyState',
  Record: mockData,
};

const mockDataAnggaran: AnggaranDTO = {
  docType: 'anggaran',
  nama_lembaga: 'FMIPA',
  sisa_anggaran: 25000000,
};

const mockStateAnggaran = {
  Key: 'keyStateAnggaran',
  Record: mockDataAnggaran,
};

describe('BiayaRiilService', () => {
  let service: BiayaRiilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BiayaRiilService,
        AppUtil,
        ResponseHelper,
        {
          provide: HlfConfig,
          useValue: mockedHlfConfig,
        },
      ],
    }).compile();

    service = module.get<BiayaRiilService>(BiayaRiilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create a Data', () => {
    describe('If new data successfully created', () => {
      beforeEach(() => {
        const arrAnggaran: Array<any> = [];
        arrAnggaran.push(mockStateAnggaran);
        mockedHlfConfig.contract.evaluateTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify(arrAnggaran), 'utf-8'),
        );
        mockedHlfConfig.contract.submitTransaction.mockImplementation(
          (funcName: string, key = '', args: any = '') => {
            switch (funcName) {
              case 'create':
                return Buffer.from(JSON.stringify(true), 'utf-8');
              case 'updateByKey':
                return Buffer.from(JSON.stringify(true), 'utf-8');
              default:
                return Buffer.from(JSON.stringify(false), 'utf-8');
            }
          },
        );
      });
      it('should return true', async () => {
        const result = await service.create(mockData);
        expect(JSON.parse(result)).toEqual(true);
      });
    });

    describe('If total biaya riil is greater than budget allocation', () => {
      beforeEach(() => {
        mockDataAnggaran.sisa_anggaran = 10000000;
        const arrAnggaran: Array<any> = [];
        arrAnggaran.push(mockStateAnggaran);

        mockedHlfConfig.contract.evaluateTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify(arrAnggaran), 'utf-8'),
        );
        mockedHlfConfig.contract.submitTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify(false), 'utf-8'),
        );
      });
      it('should throw an error', async () => {
        await expect(service.create(mockData)).rejects.toThrowError();
      });
    });

    describe('If nama lembaga is not found', () => {
      beforeEach(() => {
        mockedHlfConfig.contract.evaluateTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify([]), 'utf-8'),
        );
      });
      it('should throw an error', async () => {
        await expect(service.create(mockData)).rejects.toThrowError();
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
      it('should return array of state data', async () => {
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

  describe('Find Spesific Data By Key', () => {
    describe('If any data exist', () => {
      beforeEach(() => {
        mockedHlfConfig.contract.evaluateTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify(mockData), 'utf-8'),
        );
      });
      it('should return an object data', async () => {
        const result = await service.findOne('keyState');
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
        const result = await service.findOne('keyState');
        expect(JSON.parse(result)).toEqual({});
      });
    });

    describe('If argument key is empty', () => {
      it('should throw an error', async () => {
        await expect(service.findOne('')).rejects.toThrowError(
          'Key argument cannot be empty',
        );
      });
    });
  });

  describe('Find By Query', () => {
    describe('If argument of key or value is empty', () => {
      it('should throw an exception', async () => {
        await expect(service.findByQuery('', '')).rejects.toThrowError();
      });
    });

    describe('If data is found', () => {
      const arrData: Array<any> = [mockState];
      beforeEach(() => {
        mockedHlfConfig.contract.evaluateTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify(arrData), 'utf-8'),
        );
      });
      it('should return array of data', async () => {
        const result = await service.findByQuery('key', 'value');
        expect(JSON.parse(result)).toEqual(arrData);
      });
    });
  });

  describe('Update a Data', () => {
    describe('If the data successfully updated', () => {
      beforeEach(() => {
        mockedHlfConfig.contract.submitTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify(true), 'utf-8'),
        );
      });
      it('should return true', async () => {
        const result = await service.update('keyState', mockData);
        expect(JSON.parse(result)).toEqual(true);
      });
    });

    describe('If something wrong while updating data', () => {
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

    describe('If something when wrong while deleting data', () => {
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
