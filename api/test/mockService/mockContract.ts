import { Injectable } from '@nestjs/common';

export enum ListFunc {
  CREATE = 'create',
  GETBYTYPE = 'getByType',
  GETBYKEY = 'getByKey',
  UPDATE = 'updateByKey',
  DELETE = 'deleteByKey',
}

@Injectable()
export class MockContract {
  private states: Array<any> = [];

  // submitTransaction(funcName: string, ...params: string[]) {
  //   switch (funcName) {
  //     case ListFunc.CREATE:
  //       const jsonData = JSON.parse(params[0]);
  //       this.states.push(jsonData);
  //       return 'Data berhasil ditambahkan';
  //     default:
  //       break;
  //   }
  // }

  evaluateTransaction = (funcName: string, ...params: string[]) =>
    new Promise<Buffer>((resolve) => {
      switch (funcName) {
        case ListFunc.GETBYTYPE:
          let result: any = this.states.filter(
            (state) => state.docType === params[0],
          );

          if (!result.length) result = '[]';

          resolve(Buffer.from(result));
          break;
      }
    });
}
