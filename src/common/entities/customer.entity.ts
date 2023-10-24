import { Column, Entity, OneToMany } from "typeorm";
import { baseEntity } from "./base.entity";
import { BookingHistory } from "./booking-history.entity";

@Entity()
export class Customer extends baseEntity {
  @OneToMany(() => BookingHistory, bookingHistory => bookingHistory.customer)
  bookingHistories: BookingHistory[];

  @Column({ type: "boolean", default: false })
  broadcast: boolean;

  @Column()
  customerName: string;

  @Column("simple-array", { default: "", nullable: true })
  facilities: string[];

  @Column({ type: "int", default: 0 })
  numberOfBookings: number;

  @Column({ unique: true })
  phoneNumber: string;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  totalSpend: string;
}
