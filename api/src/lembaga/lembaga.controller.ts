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
import { LembagaDto } from './lembaga.dto';
import { LembagaService } from './lembaga.service';

@ApiTags('Lembaga')
@Controller('lembaga')
export class LembagaController {
  constructor(private readonly lembagaService: LembagaService) {}

  @Post()
  create(@Body() lembagaDto: LembagaDto) {
    return this.lembagaService.create(lembagaDto);
  }

  @Get()
  findAll() {
    return this.lembagaService.findAll();
  }

  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.lembagaService.findOne(key);
  }

  @Put(':key')
  update(@Param('key') key: string, @Body() lembagaDto: LembagaDto) {
    return this.lembagaService.update(key, lembagaDto);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.lembagaService.remove(key);
  }
}
