import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CarsDto {
  @IsString()
  @ApiProperty()
  readonly key: string;

  @IsString()
  @ApiProperty()
  readonly make: string;

  @IsString()
  @ApiProperty()
  readonly model: string;

  @IsString()
  @ApiProperty()
  readonly color: string;

  @IsString()
  @ApiProperty()
  readonly owner: string;
}
