import { ApiProperty } from '@nestjs/swagger';

export class CreateProvinsiDto {
  @ApiProperty({
    example: 'Jawa',
  })
  nama: string;
}
