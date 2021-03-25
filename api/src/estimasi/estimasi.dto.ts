import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EstimasiDTO {
  @IsString()
  @ApiProperty({
    default: 'estimasi',
  })
  docType: string;

  @IsString()
  @ApiProperty({
    example: 'nama_pemohon',
  })
  nama_pemohon: string;

  @IsString()
  @ApiProperty({
    example: 'FMIPA',
  })
  nama_lembaga: string;

  @IsString()
  @ApiProperty({
    example: 'jenis_pmk',
  })
  jenis_pmk: string;

  @IsString()
  @ApiProperty({
    example: 'kategori_pmk',
  })
  kategori_pmk: string;

  @IsString()
  @ApiProperty({
    example: '10/05/2019',
  })
  tanggal_berangkat: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'keterangan',
  })
  keterangan: string;

  @IsString()
  @ApiProperty({
    example: 'Bandung',
  })
  asal: string;

  @IsString()
  @ApiProperty({
    example: 'Jakarta',
  })
  tujuan: string;

  @IsString()
  @ApiProperty({
    example: '10000000',
  })
  biaya: string;

  @IsString()
  @ApiProperty({
    example: '2',
  })
  banyak: string;

  @IsString()
  @ApiProperty({
    example: '20000000',
  })
  total: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'status',
  })
  status: string;
}
