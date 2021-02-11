import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export enum Jabatan {
  Admin = 'Admin',
  BagianUmum = 'BagianUmum',
  AdminKeuangan = 'AdminKeuangan',
  KepalaKeuangan = 'KepalaKeuangan',
  KepalaBiroAUPK = 'KepalaBiroAUPK',
}

export class UserDto {
  @IsString()
  @ApiProperty({
    default: 'user',
  })
  docType: string;

  @IsString()
  @ApiProperty({
    description: 'username yang akan digunakan untuk login',
    example: 'testUsername',
  })
  username: string;

  @IsString()
  @ApiProperty({
    description: 'nama lengkap pengguna',
    example: 'test nama lengkap',
  })
  nama_lengkap: string;

  @IsString()
  @ApiProperty({
    description: 'password untuk login',
    example: '123pwd',
  })
  password: string;

  @IsString()
  @ApiProperty({
    example: '192802984278219',
  })
  nip: string;

  @IsString()
  @ApiProperty({
    enum: Jabatan,
    example: 'admin',
  })
  jabatan: string;
}
