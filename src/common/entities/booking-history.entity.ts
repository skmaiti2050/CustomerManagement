import { Column, Entity, ManyToOne } from "typeorm";
import { baseEntity } from "./base.entity";
import { Club } from "./club.entity";
import { Customer } from "./customer.entity";

@Entity()
export class BookingHistory extends baseEntity {
  @Column("decimal", { precision: 10, scale: 2 })
  bill: string;

  @ManyToOne(() => Club, club => club.bookingHistories)
  club: Club;

  @Column()
  clubId: number;

  @ManyToOne(() => Customer, customer => customer.bookingHistories)
  customer: Customer;

  @Column()
  customerId: number;

  @Column({ default: 1 })
  numberOfBookings: number;

  @Column({ type: "timestamp with time zone" })
  timeOfBooking: Date;
}
