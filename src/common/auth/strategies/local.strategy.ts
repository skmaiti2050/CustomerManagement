import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "../../../common/entities/user.entity";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "email",
      passwordField: "password"
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = this.authService.getAuthenticatedUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
