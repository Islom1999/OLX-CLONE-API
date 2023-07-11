import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString() 
  @IsNotEmpty()
  @MinLength(6)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  region: string;
}
