import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ResponseBodyDto } from "../utility/response.dto";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        if (!context.switchToHttp().getResponse()) {
          this.logger.error("Response object is missing in the context.");
          return { statusCode: 500, message: "Internal Server Error" };
        }

        const response: ResponseBodyDto = {
          statusCode: context.switchToHttp().getResponse().statusCode || 200
        };

        if (typeof data === "string") {
          response.message = data;
        } else if (data !== undefined) {
          response.data = data;
        }

        return response;
      })
    );
  }
}
