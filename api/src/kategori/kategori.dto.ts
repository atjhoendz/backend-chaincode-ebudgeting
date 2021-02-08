import { ApiProperty } from '@nestjs/swagger';

export class KategoriDto {
  @ApiProperty({
    default: 'kategori',
  })
  docType: string;

  @ApiProperty({
    example: 'Kerjasama',
  })
  nama: string;
}
