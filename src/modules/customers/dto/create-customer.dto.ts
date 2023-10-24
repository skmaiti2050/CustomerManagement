import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max
} from "class-validator";

export class CreateCustomerDto {
  @ApiProperty()
  @IsBoolean()
  broadcast: boolean;

  @ApiProperty({ example: "Demo User" })
  @Matches(/^[a-zA-Z]+(\.?[ ]?[a-zA-Z]+\.?)*\.?$/, {
    message:
      "Customer name must contain only letters (a-zA-Z) and may have periods (.) and a single space between words."
  })
  @Length(2, 200, { message: "Customer name length must be between 2 and 200 characters." })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({ type: () => [String], required: false, example: ["Cricket", "Football"] })
  @IsArray()
  @IsOptional()
  facilities: string[];

  @ApiHideProperty()
  @IsInt()
  @Max(1_00_000, { message: "Maximum booking should be below 100000" })
  numberOfBookings: number = 0;

  @ApiProperty({ example: "+919876543210" })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiHideProperty()
  @IsDecimal()
  totalSpend: string = "0.0";
}
