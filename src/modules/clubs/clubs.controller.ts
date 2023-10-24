import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { Club } from "../../common/entities/club.entity";
import { ClubsService } from "./clubs.service";
import { CreateClubDto } from "./dto/create-club.dto";
import { UpdateClubDto } from "./dto/update-club.dto";

@ApiTags("Club")
@ApiBearerAuth("access-token")
@Controller("clubs")
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @ApiOperation({ summary: "Create a new club" })
  @ApiBody({ type: CreateClubDto })
  @Post()
  async createClub(@Body() clubData: CreateClubDto): Promise<Club> {
    return this.clubsService.createClub(clubData);
  }

  @ApiOperation({ summary: "Get all clubs" })
  @Get()
  async getAllClubs(): Promise<Club[]> {
    return this.clubsService.getAllClubs();
  }

  @ApiOperation({ summary: "Get a specific club by ID" })
  @ApiParam({ name: "id", type: "number", description: "Club ID" })
  @Get(":id")
  async getClubById(@Param("id") id: number): Promise<Club> {
    return this.clubsService.getClubById(id);
  }

  @ApiOperation({ summary: "Update a specific club by ID" })
  @ApiParam({ name: "id", type: "number", description: "Club ID" })
  @ApiBody({ type: UpdateClubDto })
  @Patch(":id")
  async updateClub(@Param("id") id: number, @Body() clubData: UpdateClubDto): Promise<Club> {
    return this.clubsService.updateClub(id, clubData);
  }

  @ApiOperation({ summary: "Delete a specific club by ID" })
  @ApiParam({ name: "id", type: "number", description: "Club ID" })
  @Delete(":id")
  async deleteClub(@Param("id") id: number): Promise<void> {
    return this.clubsService.deleteClub(id);
  }
}
