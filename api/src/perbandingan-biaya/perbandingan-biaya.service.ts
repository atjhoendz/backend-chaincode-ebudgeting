import { Injectable } from '@nestjs/common';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';

@Injectable()
export class PerbandinganBiayaService {
  constructor(private hlfConfig: HlfConfig, private appUtil: AppUtil) {}

  async getDataBiayaRiilByNamaPemohon(nama: string) {
    try {
      const dataBiayaRiil = await this.hlfConfig.contract.evaluateTransaction(
        'getByType',
        'biaya-riil',
      );

      const dataBiayaRiilJSON = this.appUtil.prettyJSONString(dataBiayaRiil);

      const filteredDataByNama = JSON.parse(dataBiayaRiilJSON).filter(
        (item) => {
          return item.Record.nama_pemohon == nama;
        },
      );

      return filteredDataByNama;
    } catch (err) {
      throw err;
    }
  }

  async getDataPerbandingan(keyPemohon: string) {
    try {
      const dataPemohon = await this.hlfConfig.contract.evaluateTransaction(
        'getByKey',
        keyPemohon,
      );
      const dataEstimasi = await this.hlfConfig.contract.evaluateTransaction(
        'getByType',
        'estimasi',
      );
      const dataBiayaRiil = await this.hlfConfig.contract.evaluateTransaction(
        'getByType',
        'biaya-riil',
      );

      const dataPemohonJSON = JSON.parse(
        this.appUtil.prettyJSONString(dataPemohon),
      );

      if (!Object.keys(dataPemohonJSON).length)
        throw new Error('Data tidak ditemukan.');

      const dataEstimasiJSON = JSON.parse(
        this.appUtil.prettyJSONString(dataEstimasi),
      );
      const dataBiayaRiilJSON = JSON.parse(
        this.appUtil.prettyJSONString(dataBiayaRiil),
      );

      const filteredDataEstimasi = dataEstimasiJSON.filter((item) => {
        return item.Record.nama_pemohon == dataPemohonJSON.nama;
      });

      const filteredDataBiayaRiil = dataBiayaRiilJSON.filter((item) => {
        return item.Record.nama_pemohon == dataPemohonJSON.nama;
      });

      const responseData = {
        dataPemohon: dataPemohonJSON,
        dataEstimasi: JSON.parse(JSON.stringify(filteredDataEstimasi)),
        dataBiayaRiil: JSON.parse(JSON.stringify(filteredDataBiayaRiil)),
      };

      return responseData;
    } catch (err) {
      throw err;
    }
  }

  // for testing purpose only
  async create(data: any) {
    const result = await this.hlfConfig.contract.submitTransaction(
      'create',
      JSON.stringify(data),
    );

    return this.appUtil.prettyJSONString(result);
  }

  async findAll() {
    const result = await this.hlfConfig.contract.evaluateTransaction(
      'getByType',
      'pemohon',
    );

    return this.appUtil.prettyJSONString(result);
  }
}
