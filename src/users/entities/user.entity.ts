import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Item } from '../../catalog/item/entities/item.entity';
import { Authority } from './authority.entity';

@Entity('client')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', nullable: false })
  lastName: string;

  @Column({ name: 'middle_name', nullable: true })
  middleName: string;

  @Column({ name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ name: 'phone_number', nullable: true, unique: true })
  phone?: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];

  @ManyToMany(() => Item)
  @JoinTable({
    name: 'saved_items',
    joinColumn: { name: 'client_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'item_id', referencedColumnName: 'id' },
  })
  savedItems: Item[];

  @ManyToMany(() => Authority, { eager: true })
  @JoinTable({
    name: 'client_authority',
    joinColumn: { name: 'client_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'authority_id', referencedColumnName: 'id' },
  })
  authorities: Authority[];

  get fullName(): string {
    return `${this.lastName} ${this.firstName} ${this.middleName}`;
  }
}
