import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PemohonDTO {
  @IsString()
  @ApiProperty({
    default: 'pemohon',
  })
  docType: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'nomorspd192321',
  })
  nomor_spd: string;

  @IsString()
  @ApiProperty({
    example: '12938102901298019',
  })
  nip: string;

  @IsString()
  @ApiProperty({
    example: 'maman',
  })
  nama: string;

  @IsString()
  @ApiProperty({
    example: 'golongan',
  })
  golongan: string;

  @IsString()
  @ApiProperty({
    example: 'contohjabatan',
  })
  jabatan: string;

  @IsString()
  @ApiProperty({
    example: 'pekerjaan',
  })
  maksud_perjalanan: string;

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
    example: '2 hari',
  })
  lama: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Ada',
  })
  bukti_spd: string;

  @IsString()
  @ApiProperty({
    example: 'Diterima',
  })
  status_spd: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Biro AUPK',
  })
  status_berkas: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Dalam Perjalanan',
  })
  status_perjalanan: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '',
  })
  alasan_ditolak: string;

  @IsString()
  @ApiProperty({
    example: 'FMIPA',
  })
  nama_lembaga: string;
}
