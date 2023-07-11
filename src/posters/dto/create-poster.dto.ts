import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreatePosterDto {
  image: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumberString()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  descr: string;

  @IsString()
  @IsNotEmpty()
  region: string; 

  @IsNumberString()
  @IsNotEmpty()
  authorId: number;

  @IsNumberString()
  @IsNotEmpty()
  categoryId: number; 
}
