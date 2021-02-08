import { ApiProperty } from '@nestjs/swagger';

export class AnggaranDTO {
  @ApiProperty({
    default: 'anggaran',
  })
  docType: string;

  @ApiProperty({
    example: 'FMIPA',
  })
  nama_lembaga: string;

  @ApiProperty({
    example: 12000000,
  })
  sisa_anggaran: number;
}
