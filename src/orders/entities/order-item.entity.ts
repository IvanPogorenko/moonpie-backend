import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Color } from '../../catalog/color/entities/color.entity';
import { Size } from '../../catalog/sizes/entities/size.entity';
import { Item } from '../../catalog/item/entities/item.entity';
import { Order } from './order.entity';

@Entity('order_item')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  chest?: number;

  @Column({ nullable: true })
  waist?: number;

  @Column({ nullable: true })
  hip?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ nullable: false })
  count: number;

  @Column({ nullable: false })
  itemName: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  unitPrice: number;

  @ManyToOne(() => Color)
  @JoinColumn({ name: 'color_id' })
  color: Color;

  @ManyToOne(() => Size)
  @JoinColumn({ name: 'size_id' })
  size?: Size;

  @ManyToOne(() => Item, { nullable: false })
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @ManyToOne(() => Order, (order) => order.orderItems, { nullable: false })
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
