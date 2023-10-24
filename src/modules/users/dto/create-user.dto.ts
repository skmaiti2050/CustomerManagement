import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "demo@example.com" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "Demo" })
  @Matches(/^[a-zA-Z]+(\.?[ ]?[a-zA-Z]+\.?)*\.?$/, {
    message: "First name must contain only letters (a-zA-Z) and may have periods (.) and a single space between words."
  })
  @Length(2, 50, { message: "First name length must be between 2 and 50 characters." })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: "User" })
  @Matches(/^[a-zA-Z]+(\.?[ ]?[a-zA-Z]+\.?)*\.?$/, {
    message: "Last name must contain only letters (a-zA-Z) and may have periods (.) and a single space between words."
  })
  @Length(2, 50, { message: "Last name length must be between 2 and 50 characters." })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiHideProperty()
  @IsOptional()
  password?: string;
}
