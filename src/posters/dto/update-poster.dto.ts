import { PartialType } from '@nestjs/mapped-types';
import { CreatePosterDto } from './create-poster.dto';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class UpdatePosterDto extends PartialType(CreatePosterDto) {
  @IsString()
  image: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  // @IsNumberString()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  descr: string;

  @IsString()
  @IsNotEmpty()
  region: string;
}
