import { IsString } from 'class-validator';

export class CarsDto {
  @IsString()
  readonly key: string;

  @IsString()
  readonly make: string;

  @IsString()
  readonly model: string;

  @IsString()
  readonly color: string;

  @IsString()
  readonly owner: string;
}
