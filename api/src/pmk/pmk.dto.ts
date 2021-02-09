import { ApiProperty } from '@nestjs/swagger';

export class PmkDTO {
  @ApiProperty({
    default: 'pmk',
  })
  docType: string;

  @ApiProperty({
    example: '2020',
  })
  tahun: string;

  @ApiProperty({
    example: 'jenispmk',
  })
  jenis_pmk: string;

  @ApiProperty({
    example: 'golonganpenginapan',
  })
  golongan_penginapan: string;

  @ApiProperty({
    example: 'jenistiket',
  })
  jenis_tiket: string;

  @ApiProperty({
    example: 'Bandung',
  })
  asal: string;

  @ApiProperty({
    example: 'Jakarta',
  })
  tujuan: string;

  @ApiProperty({
    example: 'cthSatuan',
  })
  satuan: string;

  @ApiProperty({
    example: 20000000,
  })
  biaya: number;

  @ApiProperty({
    example: 'dalam_kota',
  })
  dalam_kota: string;

  @ApiProperty({
    example: 'luar_kota',
  })
  luar_kota: string;

  @ApiProperty({
    example: 'keyprovinsi',
  })
  key_provinsi: string;

  @ApiProperty({
    example: 'key_kategori',
  })
  key_kategori: string;
}
