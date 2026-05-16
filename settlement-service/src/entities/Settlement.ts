import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Settlement {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
  })
  bookingId!: string;

  @Column()
  userId!: string;

  @Column()
  finalAmountCents!: number;

  @Column()
  status!: string;

  @Column({ nullable: true })
  paymentReference!: string;

  @Column()
  traceId!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
