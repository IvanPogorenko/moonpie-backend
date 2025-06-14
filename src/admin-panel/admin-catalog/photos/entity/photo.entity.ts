import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from '../../../../catalog/item/entities/item.entity';

@Entity('photo')
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  url: string;

  @ManyToOne(() => Item, (item) => item.photoUrlList)
  @JoinColumn({ name: 'item_id' })
  item: Item;
}
