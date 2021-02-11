import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PmkDTO {
  @IsString()
  @ApiProperty({
    default: 'pmk',
  })
  docType: string;

  @IsString()
  @ApiProperty({
    example: '2020',
  })
  tahun: string;

  @IsString()
  @ApiProperty({
    example: 'jenispmk',
  })
  jenis_pmk: string;

  @IsString()
  @ApiProperty({
    example: 'golonganpenginapan',
  })
  golongan_penginapan: string;

  @IsString()
  @ApiProperty({
    example: 'jenistiket',
  })
  jenis_tiket: string;

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
    example: 'cthSatuan',
  })
  satuan: string;

  @IsString()
  @ApiProperty({
    example: 20000000,
  })
  biaya: number;

  @IsString()
  @ApiProperty({
    example: 'dalam_kota',
  })
  dalam_kota: string;

  @IsString()
  @ApiProperty({
    example: 'luar_kota',
  })
  luar_kota: string;

  @IsString()
  @ApiProperty({
    example: 'keyprovinsi',
  })
  key_provinsi: string;

  @IsString()
  @ApiProperty({
    example: 'key_kategori',
  })
  key_kategori: string;
}
