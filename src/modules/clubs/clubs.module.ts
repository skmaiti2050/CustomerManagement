import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Club } from "../../common/entities/club.entity";
import { ClubsController } from "./clubs.controller";
import { ClubsService } from "./clubs.service";

@Module({
  imports: [TypeOrmModule.forFeature([Club])],
  controllers: [ClubsController],
  providers: [ClubsService]
})
export class ClubsModule {}
