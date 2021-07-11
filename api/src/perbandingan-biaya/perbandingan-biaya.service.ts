import { Injectable } from '@nestjs/common';
import { AppUtil } from '../chaincode-service/appUtil.service';
import { HlfConfig } from '../chaincode-service/hlfConfig';

@Injectable()
export class PerbandinganBiayaService {
  constructor(private hlfConfig: HlfConfig, private appUtil: AppUtil) {}

  async getDataBiayaRiilByKeyPemohon(key: string) {
    try {
      const dataBiayaRiil = await this.hlfConfig.contract.evaluateTransaction(
        'getByType',
        'biaya-riil',
      );

      const dataBiayaRiilJSON = this.appUtil.prettyJSONString(dataBiayaRiil);

      const filteredDataByKey = JSON.parse(dataBiayaRiilJSON).filter((item) => {
        return item.Record.data_pemohon.key == key;
      });

      return filteredDataByKey;
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
        return item.Record.data_pemohon.nama == dataPemohonJSON.nama;
      });

      const filteredDataBiayaRiil = dataBiayaRiilJSON.filter((item) => {
        return item.Record.data_pemohon.nama == dataPemohonJSON.nama;
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
}
