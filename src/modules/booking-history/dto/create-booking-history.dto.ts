import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDecimal, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateBookingHistoryDto {
  @ApiProperty({ default: 0.0 })
  @IsDecimal()
  @IsNotEmpty()
  bill: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  clubId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  customerId: number;

  @ApiProperty({ default: 1 })
  @IsInt()
  @IsOptional()
  numberOfBookings?: number;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  timeOfBooking: Date;
}
