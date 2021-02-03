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
import { CreateProvinsiDto } from './dto/create-provinsi.dto';
import { UpdateProvinsiDto } from './dto/update-provinsi.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Provinsi')
@Controller('provinsi')
export class ProvinsiController {
  constructor(private readonly provinsiService: ProvinsiService) {}

  @Post()
  create(@Body() createProvinsiDto: CreateProvinsiDto) {
    return this.provinsiService.create(createProvinsiDto);
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
  update(
    @Param('key') key: string,
    @Body() updateProvinsiDto: UpdateProvinsiDto,
  ) {
    return this.provinsiService.update(key, updateProvinsiDto);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.provinsiService.remove(key);
  }
}
