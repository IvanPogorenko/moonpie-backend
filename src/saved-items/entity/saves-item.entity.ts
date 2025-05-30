import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Item } from '../../catalog/item/entities/item.entity';

@Entity('saved_item')
export class SavesItem {
  @PrimaryColumn({ name: 'client_id' })
  clientId: number;

  @PrimaryColumn({ name: 'item_id' })
  itemId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'client_id' })
  client: User;

  @ManyToOne(() => Item)
  @JoinColumn({ name: 'item_id' })
  item: Item;
}
