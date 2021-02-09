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
import { PenomoranDTO } from './penomoran.dto';
import { PenomoranService } from './penomoran.service';

@ApiTags('Penomoran')
@Controller('penomoran')
export class PenomoranController {
  constructor(private readonly penomoranService: PenomoranService) {}

  @Post()
  create(@Body() penomoranDTO: PenomoranDTO) {
    return this.penomoranService.create(penomoranDTO);
  }

  @Get()
  findAll() {
    return this.penomoranService.findAll();
  }

  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.penomoranService.findOne(key);
  }

  @Put(':key')
  update(@Param('key') key: string, @Body() penomoranDTO: PenomoranDTO) {
    return this.penomoranService.update(key, penomoranDTO);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.penomoranService.remove(key);
  }
}
