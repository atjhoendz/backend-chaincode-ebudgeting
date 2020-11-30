import { Injectable } from '@nestjs/common';
import { CarsDto } from './cars.model';

@Injectable()
export class CarsService {
  create(carsDto: CarsDto) {
    return 'This action adds a new car';
  }

  findAll() {
    return `This action returns all cars`;
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, carsDto: CarsDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
