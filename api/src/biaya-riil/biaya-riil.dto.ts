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

  @ApiProperty({
    example: {
      alasan_ditolak: '',
      bukti_spd: 'Ada',
      asal: 'Bandung',
      docType: 'pemohon',
      golongan: 'golongan',
      jabatan: 'contohJabatan',
      key: 'alskaaslaks-asaksjdf-asa',
      lama: '2 hari',
      maksud_perjalanan: 'pekerjaan',
      nama: 'armando',
      nama_lembaga: 'FMIPA',
      nip: '124890568467229187',
      nomor_spd: 'nomorspd2012012',
      status_berkas: 'BIRO AUPK',
      status_spd: 'Diterima',
      tujuan: 'Jakarta',
    },
  })
  data_pemohon: any;

  @IsString()
  @ApiProperty({
    example: 'FMIPA',
  })
  nama_lembaga: string;
}
