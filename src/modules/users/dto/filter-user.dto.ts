import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, Length, Matches } from "class-validator";

export class FilterUserDto {
  @ApiProperty({ example: "demo@example.com" })
  @IsOptional()
  email: string;

  @ApiProperty({ example: "Demo" })
  @Matches(/^[a-zA-Z]+(\.?[ ]?[a-zA-Z]+\.?)*\.?$/, {
    message: "First name must contain only letters (a-zA-Z) and may have periods (.) and a single space between words."
  })
  @Length(1, 50, { message: "First name length must be less than 50 characters." })
  @IsOptional()
  firstName: string;

  @ApiProperty({ example: "User" })
  @Matches(/^[a-zA-Z]+(\.?[ ]?[a-zA-Z]+\.?)*\.?$/, {
    message: "Last name must contain only letters (a-zA-Z) and may have periods (.) and a single space between words."
  })
  @Length(1, 50, { message: "Last name length must be less than 50 characters." })
  @IsOptional()
  lastName: string;
}
