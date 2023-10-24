import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateClubDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 200, { message: "Club name length must be between 2 and 200 characters." })
  clubName: string;
}
