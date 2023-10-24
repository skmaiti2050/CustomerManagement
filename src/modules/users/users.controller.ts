import { Body, Controller, Delete, Get, Param, Patch, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/auth/guards/jwt-auth.guard";
import CustomRequest from "../../common/interfaces/custom-request.interface";
import { FilterUserDto } from "./dto/filter-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@ApiTags("User")
@ApiBearerAuth("access-token")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiQuery({ name: "email", required: false, type: String, description: "Filter by email" })
  @ApiQuery({ name: "firstName", required: false, type: String, description: "Filter by first name" })
  @ApiQuery({ name: "lastName", required: false, type: String, description: "Filter by last name" })
  @ApiOperation({ summary: "Get all users with optional filters" })
  findAll(@Query() filters: FilterUserDto) {
    return this.usersService.findAll(filters);
  }

  @Get(":email")
  @ApiOperation({ summary: "Get a user by email" })
  getUser(@Param("email") email: string) {
    return this.usersService.getUser(email);
  }

  @Patch()
  @ApiOperation({ summary: "Update a user" })
  updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(updateUserDto);
  }

  @Delete(":email")
  @ApiOperation({ summary: "Delete a user by email" })
  @UseGuards(JwtAuthGuard)
  @Delete(":email")
  async removeUser(@Param("email") email: string, @Req() request: CustomRequest) {
    const requestingUser = request.user;
    return this.usersService.removeUser(email, requestingUser);
  }
}
