import { Injectable } from '@nestjs/common';
import { rejects } from 'assert';
import { v1 as uuidv1 } from 'uuid';

export enum ListFunc {
  CREATE = 'create',
  GETBYTYPE = 'getByType',
  GETBYKEY = 'getByKey',
  UPDATE = 'updateByKey',
  DELETE = 'deleteByKey',
}

export type State = {
  Key: string;
  Record: Record<string, string>;
};

@Injectable()
export class MockContract {
  private states: Array<State> = [];

  submitTransaction = (funcName: string, ...params: string[]) =>
    new Promise<Buffer>((resolve, reject) => {
      let jsonData, found;
      switch (funcName) {
        case ListFunc.CREATE:
          jsonData = JSON.parse(params[0]);

          const newState: State = {
            Key: uuidv1(),
            Record: jsonData,
          };

          this.states.push(newState);

          let msg: any = Buffer.from('Data tidak berhasil ditambahkan');

          if (this.states.length)
            msg = Buffer.from('Data berhasil ditambahkan');

          resolve(msg);
          break;
        case ListFunc.UPDATE:
          jsonData = JSON.parse(params[1]);

          found = false;
          for (const key in this.states) {
            if (this.states[key].Key === params[0]) {
              this.states[key].Record = jsonData;
              found = true;
            }
          }

          if (found) return resolve(Buffer.from('Data berhasil diperbarui'));
          resolve(Buffer.from('Data tidak tersedia'));
          break;
        case ListFunc.DELETE:
          if (this.states.find((state) => state.Key === params[0])) {
            this.states = this.states.filter((state) => state.Key != params[0]);
            return resolve(Buffer.from('Data berhasil dihapus'));
          }
          resolve(Buffer.from('Data tidak tersedia'));
          break;
        default:
          reject('Nama fungsi tidak tersedia');
          break;
      }
    });

  evaluateTransaction = (funcName: string, ...params: string[]) =>
    new Promise<Buffer>((resolve, reject) => {
      let result;
      switch (funcName) {
        case ListFunc.GETBYTYPE:
          result = this.states.filter(
            (state) => state.Record.docType === params[0],
          );

          resolve(Buffer.from(JSON.stringify(result)));
          break;
        case ListFunc.GETBYKEY:
          result = this.states.find((state) => state.Key === params[0]);

          if (result) {
            result = JSON.stringify(result.Record);
          } else {
            result = 'Data tidak tersedia';
          }

          resolve(Buffer.from(result));
          break;
        default:
          reject('Nama fungsi tidak tersedia');
          break;
      }
    });
}
