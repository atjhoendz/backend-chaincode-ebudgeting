import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class LembagaDto {
  @IsString()
  @ApiProperty({
    default: 'lembaga',
  })
  docType: string;

  @IsString()
  @ApiProperty({
    example: 'FMIPA',
  })
  nama: string;

  @IsNumber()
  @ApiProperty({
    example: 2000000,
  })
  jumlah_anggaran: number;
}
