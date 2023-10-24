import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC_KEY } from "../../../common/decorators/public.decorator";
import { AuthService } from "../auth.service";
import CustomRequest from "../../../common/interfaces/custom-request.interface";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(
    private authService: AuthService,
    private reflector: Reflector
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) {
      return true;
    }

    const request: CustomRequest = context.switchToHttp().getRequest(); // Use the custom Request type
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.authService.verifyToken(token);
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: CustomRequest): string | undefined {
    const [type, token] = request.headers?.["authorization"]?.split(" ") || [];
    return type === "Bearer" ? token : undefined;
  }
}
