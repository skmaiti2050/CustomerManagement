import { BaseEntity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class baseEntity extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @CreateDateColumn({
    type: "timestamp with time zone"
  })
  createdAt: Date;

  @DeleteDateColumn({
    type: "timestamp with time zone"
  })
  deletedAt: Date;

  @UpdateDateColumn({
    type: "timestamp with time zone"
  })
  updatedAt: Date;
}
