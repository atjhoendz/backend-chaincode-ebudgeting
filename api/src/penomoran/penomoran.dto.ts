import { ApiProperty } from '@nestjs/swagger';

export class PenomoranDTO {
  @ApiProperty({
    default: 'penomoran',
  })
  docType: string;

  @ApiProperty({
    example: '19280129801298',
  })
  nomor: string;

  @ApiProperty({
    example: '2/2/2020',
  })
  tanggal: string;
}
