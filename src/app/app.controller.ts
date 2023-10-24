import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Public } from "../common/decorators/public.decorator";
import { AppService } from "./app.service";

@ApiTags("App")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get("healthCheck")
  @ApiOperation({ summary: "Check the health of the application" })
  healthCheck(): string {
    return this.appService.healthCheck();
  }
}
