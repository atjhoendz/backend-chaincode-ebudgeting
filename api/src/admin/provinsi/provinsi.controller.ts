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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.provinsiService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProvinsiDto: UpdateProvinsiDto,
  ) {
    return this.provinsiService.update(+id, updateProvinsiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.provinsiService.remove(+id);
  }
}
