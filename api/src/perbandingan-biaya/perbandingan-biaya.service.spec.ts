import { Test, TestingModule } from '@nestjs/testing';
import { BiayaRiilDTO } from 'src/biaya-riil/biaya-riil.dto';
import { BiayaRiilService } from 'src/biaya-riil/biaya-riil.service';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { EstimasiDTO } from 'src/estimasi/estimasi.dto';
import { ResponseHelper } from 'src/helper/response.helper';
import { PemohonDTO } from 'src/pemohon/pemohon.dto';
import { PemohonService } from 'src/pemohon/pemohon.service';
import { MockContract } from '../../test/mockService/mockContract';
import { HlfConfig } from '../../test/mockService/mockHlfConfig';
import { PerbandinganBiayaService } from './perbandingan-biaya.service';

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

const mockDataBiayaRiil: BiayaRiilDTO = {
  docType: 'biaya-riil',
  data_pemohon: 'maman',
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
  data_pemohon: 'nama pemohon',
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
  Key: expect.any(String),
  Record: mockDataBiayaRiil,
};

describe('PerbandinganBiayaService', () => {
  let perbandinganBiayaService: PerbandinganBiayaService;

  beforeEach(async () => {
    const perbandinganBiayaModule: TestingModule = await Test.createTestingModule(
      {
        providers: [
          PerbandinganBiayaService,
          HlfConfig,
          MockContract,
          AppUtil,
          ResponseHelper,
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

  describe('Get data biaya riil by nama pemohon', () => {
    it('should return empty array if data is not exist', async () => {
      const result = await perbandinganBiayaService.getDataBiayaRiilByNamaPemohon(
        'akajslkj',
      );

      expect(result).toHaveLength(0);
    });

    it('should return array of json object if data is exist', async () => {
      await perbandinganBiayaService.create(mockDataBiayaRiil);

      const result = await perbandinganBiayaService.getDataBiayaRiilByNamaPemohon(
        mockDataPemohon.nama,
      );

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(mockStateBiayaRiil);
    });
  });

  describe('Get data perbandingan', () => {
    // this error cause on mockContract result
    // it('should throw an error if data is not exist', async () => {
    //   const result = await perbandinganBiayaService.getDataPerbandingan(
    //     'inikey',
    //   );

    //   expect(result).toThrowError('Data tidak ditemukan.');
    // });
    it('should return an object if data is exist', async () => {
      await perbandinganBiayaService.create(mockDataPemohon);
      await perbandinganBiayaService.create(mockDataEstimasi);
      await perbandinganBiayaService.create(mockDataBiayaRiil);

      const dataPemohon = await perbandinganBiayaService.findAll();
      const key = JSON.parse(dataPemohon)[0].Key;

      const result = await perbandinganBiayaService.getDataPerbandingan(key);

      expect(result).toHaveProperty('dataPemohon');
      expect(result).toHaveProperty('dataBiayaRiil');
      expect(result).toHaveProperty('dataEstimasi');
    });
  });
});
