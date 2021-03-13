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
  nomor_spd;

  @IsString()
  @ApiProperty({
    example: '12938102901298019',
  })
  nip;

  @IsString()
  @ApiProperty({
    example: 'maman',
  })
  nama;

  @IsString()
  @ApiProperty({
    example: 'golongan',
  })
  golongan;

  @IsString()
  @ApiProperty({
    example: 'contohjabatan',
  })
  jabatan;

  @IsString()
  @ApiProperty({
    example: 'pekerjaan',
  })
  maksud_perjalanan;

  @IsString()
  @ApiProperty({
    example: 'Bandung',
  })
  asal;

  @IsString()
  @ApiProperty({
    example: 'Jakarta',
  })
  tujuan;

  @IsString()
  @ApiProperty({
    example: '2 hari',
  })
  lama;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Ada',
  })
  bukti_spd;

  @IsString()
  @ApiProperty({
    example: 'Ada',
  })
  status_spd;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Diterima',
  })
  status_permohonan;

  @IsString()
  @ApiProperty({
    example: 'FMIPA',
  })
  nama_lembaga;
}
