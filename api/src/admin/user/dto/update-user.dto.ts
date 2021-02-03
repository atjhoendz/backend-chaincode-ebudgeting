import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export enum Jabatan {
  Admin = 'Admin',
  BagianUmum = 'BagianUmum',
  Pemohon = 'Pemohon',
  AdminKeuangan = 'AdminKeuangan',
  KepalaKeuangan = 'KepalaKeuangan',
  KepalaBiroAUPK = 'KepalaBiroAUPK',
}
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'username yang akan digunakan untuk login',
    example: 'testUsername',
  })
  username: string;

  @ApiProperty({
    description: 'nama lengkap pengguna',
    example: 'test nama lengkap',
  })
  nama_lengkap: string;

  @ApiProperty({
    description: 'password untuk login',
    example: '123pwd',
  })
  password: string;

  @ApiProperty({
    example: '192802984278219',
  })
  nip: string;

  @ApiProperty({
    enum: Jabatan,
    example: 'admin',
  })
  jabatan: string;
}
