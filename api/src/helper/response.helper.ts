import { Injectable } from '@nestjs/common';
import { ResponseModel } from './response.model';

@Injectable()
export class ResponseHelper {
  wrapResponse(
    success: boolean,
    statusCode: number,
    data: any,
    message: string,
  ) {
    try {
      data = JSON.parse(data);
    } catch (err) {
      console.log(err);
    }
    const response: ResponseModel = {
      success: success,
      statusCode: statusCode,
      data: data,
      message: message,
    };

    return response;
  }
}
