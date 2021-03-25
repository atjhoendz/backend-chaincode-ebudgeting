import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BiayaRiilDTO {
  @IsString()
  @ApiProperty({
    default: 'biaya-riil',
  })
  docType: string;

  @IsString()
  @ApiProperty({
    example: '10/05/2020',
  })
  tanggal_berangkat: string;

  @IsString()
  @ApiProperty({
    example: '5000000',
  })
  biaya: string;

  @IsString()
  @ApiProperty({
    example: 'keterangan',
  })
  keterangan: string;

  @IsString()
  @ApiProperty({
    example: 'kategori_pmk',
  })
  kategori_pmk: string;

  @IsString()
  @ApiProperty({
    example: 'jenis_pmk',
  })
  jenis_pmk: string;

  @IsString()
  @ApiProperty({
    example: '10000000',
  })
  total: string;

  @IsString()
  @ApiProperty({
    example: '2',
  })
  banyak: string;

  @IsString()
  @ApiProperty({
    example: 'Ada',
  })
  bukti: string;

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
    example: 'maman',
  })
  nama_pemohon: string;
}
