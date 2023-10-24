import { Column, Entity, Index } from "typeorm";
import { baseEntity } from "./base.entity";

@Entity()
export class User extends baseEntity {
  @Index()
  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;
}
