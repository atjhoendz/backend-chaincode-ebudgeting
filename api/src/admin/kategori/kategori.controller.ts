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
import { KategoriDto } from './kategori.dto';
import { KategoriService } from './kategori.service';

@ApiTags('Kategori')
@Controller('kategori')
export class KategoriController {
  constructor(private readonly kategoriService: KategoriService) {}

  @Post()
  create(@Body() kategoriDto: KategoriDto) {
    return this.kategoriService.create(kategoriDto);
  }

  @Get()
  findAll() {
    return this.kategoriService.findAll();
  }

  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.kategoriService.findOne(key);
  }

  @Put(':key')
  update(@Param('key') key: string, @Body() kategoriDto: KategoriDto) {
    return this.kategoriService.update(key, kategoriDto);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.kategoriService.remove(key);
  }
}
