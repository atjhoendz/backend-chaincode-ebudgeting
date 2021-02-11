import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProvinsiDto {
  @IsString()
  @ApiProperty({
    default: 'provinsi',
  })
  docType: string;

  @IsString()
  @ApiProperty({
    example: 'Jawa',
  })
  nama: string;
}
