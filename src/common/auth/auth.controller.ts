import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "../../common/entities/user.entity";
import { CreateUserDto } from "../../modules/users/dto/create-user.dto";
import { Public } from "../decorators/public.decorator";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { LocalGuard } from "./guards/local.guard";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("signup")
  @ApiOperation({ summary: "Sign up a new user" })
  @ApiCreatedResponse({ type: User, description: "User created successfully" })
  @ApiConflictResponse({ description: "User with the provided email already exists" })
  @ApiBadRequestResponse({ description: "Invalid request data" })
  async signUp(@Body() signupData: CreateUserDto) {
    return this.authService.signUp(signupData);
  }

  @UseGuards(LocalGuard)
  @Public()
  @Post("login")
  @ApiOperation({ summary: "Log in with user credentials" })
  @ApiCreatedResponse({ type: User, description: "User logged in successfully" })
  @ApiConflictResponse({ description: "Invalid email or password" })
  async signIn(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }
}
