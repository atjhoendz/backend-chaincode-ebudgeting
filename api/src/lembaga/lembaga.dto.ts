import { ApiProperty } from '@nestjs/swagger';

export class LembagaDto {
  @ApiProperty({
    default: 'lembaga',
  })
  docType: string;

  @ApiProperty({
    example: 'FMIPA',
  })
  nama: string;

  @ApiProperty({
    example: 2000000,
  })
  jumlah_anggaran: number;
}
