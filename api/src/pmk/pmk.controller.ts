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
import { PmkDTO } from './pmk.dto';
import { PmkService } from './pmk.service';

@ApiTags('PMK')
@Controller('pmk')
export class PmkController {
  constructor(private readonly pmkService: PmkService) {}

  @Post()
  create(@Body() pmkDTO: PmkDTO) {
    return this.pmkService.create(pmkDTO);
  }

  @Get()
  findAll() {
    return this.pmkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pmkService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() pmkDTO: PmkDTO) {
    return this.pmkService.update(+id, pmkDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pmkService.remove(+id);
  }
}
