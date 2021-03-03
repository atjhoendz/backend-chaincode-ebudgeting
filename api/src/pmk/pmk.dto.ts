import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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
  @IsOptional()
  @ApiProperty({
    example: 'golonganpenginapan',
  })
  golongan_penginapan?: string;

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
  @IsOptional()
  @ApiProperty({
    example: 'cthSatuan',
  })
  satuan?: string;

  @IsNumber()
  @ApiProperty({
    example: 20000000,
  })
  biaya: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'dalam_kota',
  })
  dalam_kota?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'luar_kota',
  })
  luar_kota?: string;

  @IsString()
  @ApiProperty({
    example: 'nama Provinsi',
  })
  nama_provinsi: string;

  @IsString()
  @ApiProperty({
    example: 'nama Kategori',
  })
  nama_kategori: string;
}
