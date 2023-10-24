import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: "demo@example.com" })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "demo123" })
  password: string;
}
