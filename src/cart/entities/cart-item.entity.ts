import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Color } from '../../catalog/color/entities/color.entity';
import { Size } from '../../catalog/sizes/entities/size.entity';
import { Item } from '../../catalog/item/entities/item.entity';
import { Order } from '../../orders/entities/order.entity';
import { User } from '../../users/entities/user.entity';

@Entity('cart_item')
export class CartItem {
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

  @ManyToOne(() => Color)
  @JoinColumn({ name: 'color_id' })
  color: Color;

  @ManyToOne(() => Size)
  @JoinColumn({ name: 'size_id' })
  size?: Size;

  @ManyToOne(() => Item, { nullable: false })
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @ManyToOne(() => Order, (order) => order.cartItems)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
