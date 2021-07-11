import { Test, TestingModule } from '@nestjs/testing';
import { BiayaRiilDTO } from 'src/biaya-riil/biaya-riil.dto';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { EstimasiDTO } from 'src/estimasi/estimasi.dto';
import { ResponseHelper } from 'src/helper/response.helper';
import { PemohonDTO } from 'src/pemohon/pemohon.dto';
import { PerbandinganBiayaService } from './perbandingan-biaya.service';
import { HlfConfig } from '../chaincode-service/hlfConfig';
import { mockedHlfConfig } from '../../test/mockService/hlfConfig.mock';

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
  key: 'keypemohon',
  ...mockDataPemohon,
};

const mockDataBiayaRiil: BiayaRiilDTO = {
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

const mockDataEstimasi: EstimasiDTO = {
  docType: 'estimasi',
  data_pemohon: mockDataPemohon,
  nama_lembaga: 'FMIPA',
  jenis_pmk: 'jenispmk',
  kategori_pmk: 'kategoripmk',
  tanggal_berangkat: '10/03/2020',
  keterangan: 'keterangan',
  asal: 'Bandung',
  tujuan: 'Jakarta',
  biaya: '10000000',
  banyak: '2',
  total: '20000000',
};

const mockStateBiayaRiil = {
  Key: 'thisisakey',
  Record: mockDataBiayaRiil,
};

const mockStateBiayaEstimasi = {
  Key: 'thisisakey',
  Record: mockDataEstimasi,
};

describe('PerbandinganBiayaService', () => {
  let perbandinganBiayaService: PerbandinganBiayaService;

  beforeEach(async () => {
    const perbandinganBiayaModule: TestingModule = await Test.createTestingModule(
      {
        providers: [
          PerbandinganBiayaService,
          AppUtil,
          ResponseHelper,
          {
            provide: HlfConfig,
            useValue: mockedHlfConfig,
          },
        ],
      },
    ).compile();

    perbandinganBiayaService = perbandinganBiayaModule.get<PerbandinganBiayaService>(
      PerbandinganBiayaService,
    );
  });

  it('should be defined', () => {
    expect(perbandinganBiayaService).toBeDefined();
  });

  describe('Get data biaya riil by key pemohon', () => {
    describe('If data is exist', () => {
      const arrData: Array<any> = [];

      beforeEach(() => {
        arrData.push(mockStateBiayaRiil);
        mockedHlfConfig.contract.evaluateTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify(arrData), 'utf-8'),
        );
      });
      it('should return an array', async () => {
        const result = await perbandinganBiayaService.getDataBiayaRiilByKeyPemohon(
          mockStatePemohon.key,
        );
        expect(result).toEqual(arrData);
        expect(result).toHaveLength(1);
      });

      it('should return an empty array if data is not exist', async () => {
        const result = await perbandinganBiayaService.getDataBiayaRiilByKeyPemohon(
          'randomkey',
        );
        expect(result).toEqual([]);
        expect(result).toHaveLength(0);
      });
    });

    describe('If any error', () => {
      beforeEach(() => {
        mockedHlfConfig.contract.evaluateTransaction.mockRejectedValue(
          new Error('error'),
        );
      });
      it('should throw an error', async () => {
        await expect(
          perbandinganBiayaService.getDataBiayaRiilByKeyPemohon('key'),
        ).rejects.toThrowError();
      });
    });
  });

  describe('Get Data Perbandingan', () => {
    describe('If Data is Exist', () => {
      const arrBiayaRiil: Array<any> = [];
      const arrEstimasi: Array<any> = [];

      beforeEach(() => {
        mockedHlfConfig.contract.evaluateTransaction.mockImplementation(
          (name: string, key: string) => {
            switch (name) {
              case 'getByKey':
                return Buffer.from(JSON.stringify(mockDataPemohon), 'utf-8');
              case 'getByType':
                if (key == 'biaya-riil') {
                  arrBiayaRiil.push(mockStateBiayaRiil);
                  return Buffer.from(JSON.stringify(arrBiayaRiil), 'utf-8');
                }
                if (key == 'estimasi') {
                  arrEstimasi.push(mockStateBiayaEstimasi);
                  return Buffer.from(JSON.stringify(arrEstimasi), 'utf-8');
                }
                break;
            }
          },
        );
      });
      it('should return object of data pemohon estimasi and biaya riil', async () => {
        const result = await perbandinganBiayaService.getDataPerbandingan(
          'keypemohon',
        );
        expect(result).toHaveProperty('dataPemohon');
        expect(result).toHaveProperty('dataBiayaRiil');
        expect(result).toHaveProperty('dataEstimasi');
        expect(result).toEqual({
          dataPemohon: mockDataPemohon,
          dataEstimasi: arrEstimasi,
          dataBiayaRiil: arrBiayaRiil,
        });
      });
    });

    describe('If Data is Not Exist', () => {
      beforeEach(() => {
        mockedHlfConfig.contract.evaluateTransaction.mockResolvedValue(
          Buffer.from(JSON.stringify({}), 'utf-8'),
        );
      });
      it('should throw an error', async () => {
        await expect(
          perbandinganBiayaService.getDataPerbandingan('keypemohon'),
        ).rejects.toThrowError('Data tidak ditemukan.');
      });
    });
    // this error cause on mockContract result
    // it('should throw an error if data is not exist', async () => {
    //   const result = await perbandinganBiayaService.getDataPerbandingan(
    //     'inikey',
    //   );

    //   expect(result).toThrowError('Data tidak ditemukan.');
    // });
  });
});
