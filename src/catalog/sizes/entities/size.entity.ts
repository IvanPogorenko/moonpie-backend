import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('size')
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  value: string;
}
