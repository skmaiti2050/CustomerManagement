import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsOptional, IsString, Length, Matches } from "class-validator";

export class UpdateCustomerDto {
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  broadcast?: boolean;

  @ApiProperty({ example: "Demo User" })
  @Matches(/^[a-zA-Z]+(\.?[ ]?[a-zA-Z]+\.?)*\.?$/, {
    message: "Full name must contain only letters (a-zA-Z) and may have periods (.) and a single space between words."
  })
  @Length(2, 200, { message: "Customer name length must be between 2 and 200 characters." })
  @IsOptional()
  @IsString()
  customerName?: string;

  @ApiProperty({ type: () => [String], required: false, example: ["Cricket", "Football"] })
  @IsArray()
  @IsOptional()
  facilities?: string[];

  @ApiProperty({ example: "+919876543210" })
  @IsString()
  @IsOptional()
  phoneNumber?: string;
}
