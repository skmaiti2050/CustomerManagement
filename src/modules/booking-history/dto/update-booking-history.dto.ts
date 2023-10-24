import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsInt, IsNotEmpty } from "class-validator";

export class UpdateBookingHistoryDto {
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
}
