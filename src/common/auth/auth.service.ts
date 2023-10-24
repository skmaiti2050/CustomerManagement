import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compareSync } from "bcryptjs";
import { CreateUserDto } from "../../modules/users/dto/create-user.dto";
import { UsersService } from "../../modules/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signUp(signupData: CreateUserDto) {
    try {
      const existingUser = await this.usersService.getUser(signupData["email"]);
      if (existingUser) {
        throw new HttpException("User already exists, kindly login with the credentials", HttpStatus.CONFLICT);
      }
      const createdUser = this.usersService.createUser(signupData);
      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  async verifyToken(token: string) {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET
    });
    if (payload) {
      return payload;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      name: user.firstName
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET
      }),
      email: user.email,
      name: user.firstName
    };
  }

  async getAuthenticatedUser(email: string, Password: string) {
    try {
      const user = await this.usersService.getUser(email);
      await this.verifyPassword(Password, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException("Wrong credentials provided", HttpStatus.BAD_REQUEST);
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = this.usersService.getUser(email);
      return user;
    } catch (error) {
      throw new HttpException("User Not Found", HttpStatus.NOT_FOUND);
    }
  }

  async verifyPassword(password: string, hashedPassword: string) {
    const isPasswordMatching = compareSync(password, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException("Wrong credentials provided", HttpStatus.BAD_REQUEST);
    }
  }
}
