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

  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.pmkService.findOne(key);
  }

  @Put(':key')
  update(@Param('key') key: string, @Body() pmkDTO: PmkDTO) {
    return this.pmkService.update(key, pmkDTO);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.pmkService.remove(key);
  }
}
