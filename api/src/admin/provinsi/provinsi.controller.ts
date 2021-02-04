import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProvinsiService } from './provinsi.service';
import { ProvinsiDto } from './provinsi.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Provinsi')
@Controller('provinsi')
export class ProvinsiController {
  constructor(private readonly provinsiService: ProvinsiService) {}

  @Post()
  create(@Body() provinsiDto: ProvinsiDto) {
    return this.provinsiService.create(provinsiDto);
  }

  @Get()
  findAll() {
    return this.provinsiService.findAll();
  }

  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.provinsiService.findOne(key);
  }

  @Put(':key')
  update(@Param('key') key: string, @Body() provinsiDto: ProvinsiDto) {
    return this.provinsiService.update(key, provinsiDto);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.provinsiService.remove(key);
  }
}
