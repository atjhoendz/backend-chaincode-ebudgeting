import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AppUtil } from '../chaincode-service/appUtil.service';
import { HlfConfig } from '../chaincode-service/hlfConfig';
import { BiayaRiilDTO } from './biaya-riil.dto';
import { AnggaranDTO } from '../anggaran/anggaran.dto';

@Injectable()
export class BiayaRiilService {
  constructor(private hlfConfig: HlfConfig, private appUtil: AppUtil) {}

  async create(biayariilDTO: BiayaRiilDTO) {
    const queryAnggaran = JSON.stringify({
      docType: 'anggaran',
      nama_lembaga: biayariilDTO.nama_lembaga,
    });

    const dataAnggaranAsBuffer = await this.hlfConfig.contract.evaluateTransaction(
      'getByQuery',
      queryAnggaran,
    );

    const dataAnggaranAsString = this.appUtil.prettyJSONString(
      dataAnggaranAsBuffer,
    );

    let dataAnggaranAsJSON = JSON.parse(dataAnggaranAsString);

    if (!dataAnggaranAsJSON.length)
      throw new NotFoundException(
        `Nama lembaga is not found, no record ${biayariilDTO.nama_lembaga} on anggaran docType`,
      );

    dataAnggaranAsJSON = dataAnggaranAsJSON[0];

    if (biayariilDTO.total > dataAnggaranAsJSON.Record.sisa_anggaran)
      throw new BadRequestException({
        statusCode: 400,
        type: 'info',
        msg: 'Total biaya riil melebihi sisa alokasi anggaran.',
      });

    const sisaAnggaran =
      parseInt(dataAnggaranAsJSON.Record.sisa_anggaran) -
      parseInt(biayariilDTO.total);

    const updateDataAnggaran: AnggaranDTO = {
      docType: dataAnggaranAsJSON.Record.docType,
      nama_lembaga: dataAnggaranAsJSON.Record.nama_lembaga,
      sisa_anggaran: sisaAnggaran,
    };

    await this.hlfConfig.contract.submitTransaction(
      'updateByKey',
      dataAnggaranAsJSON.Key,
      JSON.stringify(updateDataAnggaran),
    );

    const result = await this.hlfConfig.contract.submitTransaction(
      'create',
      JSON.stringify(biayariilDTO),
    );

    return this.appUtil.prettyJSONString(result);
  }

  async findAll() {
    const result = await this.hlfConfig.contract.evaluateTransaction(
      'getByType',
      'biaya-riil',
    );

    return this.appUtil.prettyJSONString(result);
  }

  async findOne(key: string) {
    if (!key) throw new BadRequestException('Key argument cannot be empty');

    const result = await this.hlfConfig.contract.evaluateTransaction(
      'getByKey',
      key,
    );

    return this.appUtil.prettyJSONString(result);
  }

  async findByQuery(key: string, value: string) {
    if (!key || !value)
      throw new BadRequestException(
        'Key or value argument are cannot be empty',
      );

    const query = JSON.stringify({
      [key]: value,
    });

    const result = await this.hlfConfig.contract.evaluateTransaction(
      'getByQuery',
      query,
    );

    return this.appUtil.prettyJSONString(result);
  }

  async update(key: string, biayariilDTO: BiayaRiilDTO) {
    if (!key) throw new BadRequestException('Key argument cannot be empty');

    const result = await this.hlfConfig.contract.submitTransaction(
      'updateByKey',
      key,
      JSON.stringify(biayariilDTO),
    );

    return this.appUtil.prettyJSONString(result);
  }

  async remove(key: string) {
    if (!key) throw new BadRequestException('Key argument cannot be empty');

    const result = await this.hlfConfig.contract.submitTransaction(
      'deleteByKey',
      key,
    );

    return this.appUtil.prettyJSONString(result);
  }
}
