import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookingHistory } from "../../common/entities/booking-history.entity";
import { Club } from "../../common/entities/club.entity";
import { Customer } from "../../common/entities/customer.entity";
import { BookingHistoryController } from "./booking-history.controller";
import { BookingHistoryService } from "./booking-history.service";

@Module({
  imports: [TypeOrmModule.forFeature([BookingHistory, Club, Customer])],
  controllers: [BookingHistoryController],
  providers: [BookingHistoryService]
})
export class BookingHistoryModule {}
