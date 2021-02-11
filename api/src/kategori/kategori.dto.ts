import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class KategoriDto {
  @IsString()
  @ApiProperty({
    default: 'kategori',
  })
  docType: string;

  @IsString()
  @ApiProperty({
    example: 'Kerjasama',
  })
  nama: string;
}
