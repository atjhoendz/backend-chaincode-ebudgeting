import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AnggaranDTO {
  @IsString()
  @ApiProperty({
    default: 'anggaran',
  })
  docType: string;

  @IsString()
  @ApiProperty({
    example: 'sample-key',
  })
  key_lembaga: string;

  @IsString()
  @ApiProperty({
    example: 12000000,
  })
  sisa_anggaran: number;
}
