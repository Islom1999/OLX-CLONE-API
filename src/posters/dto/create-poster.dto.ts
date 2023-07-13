import { IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { fileURLToPath } from "url";

export class CreatePosterDto {
  @ApiProperty({
    type: String,
    description: "Upload file image",
    required: false
  })
  image: string;

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
