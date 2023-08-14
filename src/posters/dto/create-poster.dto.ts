import { IsEmpty, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { fileURLToPath } from "url";
import { Type } from "class-transformer";

export class CreatePosterDto {
  @ApiProperty({
    type: "string",
    format: "binary",
    description: "Upload file image",
    required: false
  })
  @IsOptional()
  @IsEmpty({ message: 'Image should be empty' })
  image: any;

  @ApiProperty()
  @IsString()  
  @IsNotEmpty()
  title: string; 

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty() 
  amount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  descr: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  region: string; 

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  categoryId: number; 
}
