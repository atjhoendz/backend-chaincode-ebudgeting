import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProvinsiDto } from './create-provinsi.dto';

export class UpdateProvinsiDto extends PartialType(CreateProvinsiDto) {
  @ApiProperty({
    example: 'Jawa Barat',
  })
  nama: string;
}
