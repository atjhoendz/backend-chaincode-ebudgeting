import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PenomoranDTO {
  @IsString()
  @ApiProperty({
    default: 'penomoran',
  })
  docType: string;

  @IsString()
  @ApiProperty({
    example: '19280129801298',
  })
  nomor: string;

  @IsString()
  @ApiProperty({
    example: '2/2/2020',
  })
  tanggal: string;
}
