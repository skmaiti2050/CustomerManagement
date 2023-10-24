import { Column, Entity, OneToMany } from "typeorm";
import { baseEntity } from "./base.entity";
import { BookingHistory } from "./booking-history.entity";

@Entity()
export class Club extends baseEntity {
  @OneToMany(() => BookingHistory, bookingHistory => bookingHistory.club)
  bookingHistories: BookingHistory[];

  @Column()
  clubName: string;
}
