import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class CatchExceptionFilter implements ExceptionFilter {
  private logger = new Logger(CatchExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const statusCode = exception.getStatus();
    const errorResponse = exception.getResponse() as { message: string; statusCode: number };

    this.logger.error(errorResponse.message);

    const finalResponse: any = {
      statusCode,
      message: errorResponse.message,
      timestamp: new Date().toISOString()
    };

    response.status(statusCode).json(finalResponse);
  }
}
