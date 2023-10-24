import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CatchExceptionFilter } from "../common/filters/error-handler";
import { ResponseInterceptor } from "../common/interceptors/request.interceptor";
import { AuthModule } from "../common/auth/auth.module";
import { JwtAuthGuard } from "../common/auth/guards/jwt-auth.guard";
import { dataSourceOptions } from "../common/connection/datasource";
import { BookingHistoryModule } from "../modules/booking-history/booking-history.module";
import { ClubsModule } from "../modules/clubs/clubs.module";
import { CustomersModule } from "../modules/customers/customers.module";
import { UsersModule } from "../modules/users/users.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    AuthModule,
    BookingHistoryModule,
    CustomersModule,
    ClubsModule,
    UsersModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_FILTER,
      useClass: CatchExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true }
      })
    }
  ]
})
export class AppModule {}
