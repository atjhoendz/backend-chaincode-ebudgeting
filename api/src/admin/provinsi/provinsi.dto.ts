import { ApiProperty } from '@nestjs/swagger';

export class ProvinsiDto {
  @ApiProperty({
    default: 'provinsi',
  })
  docType: string;

  @ApiProperty({
    example: 'Jawa',
  })
  nama: string;
}
