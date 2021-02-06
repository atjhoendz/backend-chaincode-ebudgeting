import { Injectable } from '@nestjs/common';
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
    new Promise<Buffer>((resolve) => {
      switch (funcName) {
        case ListFunc.CREATE:
          const jsonData = JSON.parse(params[0]);

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
      }
    });

  evaluateTransaction = (funcName: string, ...params: string[]) =>
    new Promise<Buffer>((resolve) => {
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
      }
    });
}
