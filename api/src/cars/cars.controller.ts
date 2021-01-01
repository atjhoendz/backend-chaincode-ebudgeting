import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CarsService } from './cars.service';
import { CarsDto } from './cars.model';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  create(@Body() carsDto: CarsDto) {
    return this.carsService.create(carsDto);
  }

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':carNumber')
  findOne(@Param('carNumber') carNumber: string) {
    return this.carsService.findOne(carNumber);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() carsDto: CarsDto) {
    return this.carsService.update(+id, carsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}
