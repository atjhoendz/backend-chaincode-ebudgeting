import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AnggaranDTO {
  @IsString()
  @ApiProperty({
    default: 'anggaran',
  })
  docType: string;

  @IsString()
  @ApiProperty({
    example: 'FMIPA',
  })
  nama_lembaga: string;

  @IsNumber()
  @ApiProperty({
    example: 12000000,
  })
  sisa_anggaran: number;
}
