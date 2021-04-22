import { Injectable } from '@nestjs/common';
import { AppUtil } from 'src/chaincode-service/appUtil.service';
import { HlfConfig } from 'src/chaincode-service/hlfConfig';
import { LembagaDto } from './lembaga.dto';

@Injectable()
export class LembagaService {
  constructor(private hlfConfig: HlfConfig, private appUtil: AppUtil) {}
  async create(lembagaDto: LembagaDto) {
    const result = await this.hlfConfig.contract.submitTransaction(
      'create',
      JSON.stringify(lembagaDto),
    );

    return this.appUtil.prettyJSONString(result);
  }

  async findAll() {
    const result = await this.hlfConfig.contract.evaluateTransaction(
      'getByType',
      'lembaga',
    );

    return this.appUtil.prettyJSONString(result);
  }

  async findOne(key: string) {
    const result = await this.hlfConfig.contract.evaluateTransaction(
      'getByKey',
      key,
    );

    return this.appUtil.prettyJSONString(result);
  }

  async update(key: string, lembagaDto: LembagaDto) {
    const result = await this.hlfConfig.contract.submitTransaction(
      'updateByKey',
      key,
      JSON.stringify(lembagaDto),
    );

    return this.appUtil.prettyJSONString(result);
  }

  async remove(key: string) {
    const result = await this.hlfConfig.contract.submitTransaction(
      'deleteByKey',
      key,
    );

    return this.appUtil.prettyJSONString(result);
  }

  async getDataBiayaRiilByLembaga(key: string): Promise<Record<any, any>> {
    try {
      const dataLembaga = await this.findOne(key);

      if (!Object.keys(JSON.parse(dataLembaga)).length) return {};

      const namaLembaga = JSON.parse(dataLembaga).nama;

      const dataBiayaRiil = await this.hlfConfig.contract.evaluateTransaction(
        'getByType',
        'biaya-riil',
      );

      const dataBiayaRiilJSON = await this.appUtil.prettyJSONString(
        dataBiayaRiil,
      );

      const filteredData = JSON.parse(dataBiayaRiilJSON).filter((item) => {
        return item.Record.nama_lembaga == namaLembaga;
      });

      const result = filteredData.map((item) => {
        return {
          nama_kegiatan: item.Record.data_pemohon.maksud_perjalanan,
          total_biaya: item.Record.total,
        };
      });

      return {
        data_lembaga: JSON.parse(dataLembaga),
        data_kegiatan: result,
      };
    } catch (err) {
      throw err;
    }
  }
}
