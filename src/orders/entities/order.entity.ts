import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatusEnum } from '../../common/enums/order-status.enum';
import { User } from '../../users/entities/user.entity';
import { OrderItem } from './order-item.entity';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'order_status',
    type: 'enum',
    enum: OrderStatusEnum,
    nullable: false,
  })
  orderStatus: OrderStatusEnum;

  @Column({
    name: 'total_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  totalAmount: number;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ name: 'CDEK_number', nullable: true })
  CDEKNumber: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'client_id' })
  client: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems: OrderItem[];
}
