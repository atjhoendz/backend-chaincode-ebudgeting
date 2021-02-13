import { ApiProperty } from '@nestjs/swagger';

export class AuthDTO {
  @ApiProperty({
    example: 'testUsername',
  })
  username: string;

  @ApiProperty({
    example: '123pwd',
  })
  password: string;
}
