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
import { AnggaranDTO } from './anggaran.dto';
import { AnggaranService } from './anggaran.service';

@ApiTags('Anggaran')
@Controller('anggaran')
export class AnggaranController {
  constructor(private readonly anggaranService: AnggaranService) {}

  @Post()
  create(@Body() anggaranDTO: AnggaranDTO) {
    return this.anggaranService.create(anggaranDTO);
  }

  @Get()
  findAll() {
    return this.anggaranService.findAll();
  }

  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.anggaranService.findOne(key);
  }

  @Put(':key')
  update(@Param('key') key: string, @Body() anggaranDTO: AnggaranDTO) {
    return this.anggaranService.update(key, anggaranDTO);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.anggaranService.remove(key);
  }
}
