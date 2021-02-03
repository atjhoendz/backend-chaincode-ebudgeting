import { PartialType } from '@nestjs/mapped-types';
import { CreateProvinsiDto } from './create-provinsi.dto';

export class UpdateProvinsiDto extends PartialType(CreateProvinsiDto) {}
