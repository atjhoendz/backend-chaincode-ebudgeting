import { Test, TestingModule } from '@nestjs/testing';
import { BiayaRiilService } from './biaya-riil.service';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { ResponseHelper } from 'src/helper/response.helper';
import { MockContract } from '../../test/mockService/mockContract';
import { HlfConfig } from '../../test/mockService/mockHlfConfig';
import { BiayaRiilDTO } from './biaya-riil.dto';

const mockData: BiayaRiilDTO = {
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

const mockState = {
  Key: expect.any(String),
  Record: mockData,
};

describe('BiayaRiilService', () => {
  let service: BiayaRiilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BiayaRiilService,
        HlfConfig,
        MockContract,
        AppUtil,
        ResponseHelper,
      ],
    }).compile();

    service = module.get<BiayaRiilService>(BiayaRiilService);
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
  });

  describe('Find spesific data', () => {
    it('should return object if data is exist', async () => {
      await service.create(mockData);
      const results = await service.findAll();

      const key = JSON.parse(results)[0].Key;

      const result = await service.findOne(key);

      expect(JSON.parse(result)).toEqual(mockData);
    });

    it('should return msg if data is not exist', async () => {
      const result = await service.findOne(mockState.Key);

      expect(result).toEqual('Data tidak tersedia');
    });
  });

  describe('Update a data', () => {
    it('should return true msg if update succeed', async () => {
      await service.create(mockData);
      const results = await service.findAll();

      const key = JSON.parse(results)[0].Key;

      const result = await service.update(key, mockData);

      expect(result).toEqual('Data berhasil diperbarui');
    });

    it('should return false msg if data is not exist', async () => {
      const result = await service.update(mockState.Key, mockData);

      expect(result).toEqual('Data tidak tersedia');
    });
  });

  describe('Delete a data', () => {
    it('should return true msg if delete succeed', async () => {
      await service.create(mockData);
      const results = await service.findAll();

      const key = JSON.parse(results)[0].Key;

      const result = await service.remove(key);

      expect(result).toEqual('Data berhasil dihapus');
    });

    it('should return false msg if data is not exist', async () => {
      const result = await service.remove(mockState.Key);

      expect(result).toEqual('Data tidak tersedia');
    });
  });
});
