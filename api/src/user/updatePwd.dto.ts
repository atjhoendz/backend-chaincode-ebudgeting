import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Role } from 'src/role/role.enum';

export class UpdatePwdDTO {
  @IsString()
  @ApiProperty({
    default: 'user',
  })
  docType: string;

  @IsString()
  @ApiProperty({
    example: 'testUsername',
  })
  username: string;

  @IsString()
  @ApiProperty({
    example: 'test nama lengkap',
  })
  nama_lengkap: string;

  @IsString()
  @ApiProperty({
    example: 'passwordBaru',
  })
  password: string;

  @IsString()
  @ApiProperty({
    example: '192802984278219',
  })
  nip: string;

  @IsString()
  @ApiProperty({
    enum: Role,
    example: 'Admin',
  })
  jabatan: string;
}
