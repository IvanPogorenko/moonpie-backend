import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Size } from '../../sizes/entities/size.entity';
import { Color } from '../../color/entities/color.entity';
import { Category } from '../../categories/entities/category.entity';
import { Photo } from '../../photos/entity/photo.entity';

@Entity('catalog_item')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'quantity_in_stock', nullable: false, default: 0 })
  quantityInStock: number;

  // @Version(undefined)
  // version: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ nullable: false })
  article: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ name: 'to_display', nullable: false, default: true })
  toDisplay: boolean;

  @ManyToMany(() => Size)
  @JoinTable({
    name: 'item_size',
    joinColumn: { name: 'item_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'size_id', referencedColumnName: 'id' },
  })
  sizes: Size[];

  @ManyToMany(() => Color)
  @JoinTable({
    name: 'item_color',
    joinColumn: { name: 'item_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'color_id', referencedColumnName: 'id' },
  })
  colors: Color[];

  @ManyToOne(() => Category, (category) => category.items)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => Photo, (photo) => photo.item)
  photoUrlList: Photo[];
}
