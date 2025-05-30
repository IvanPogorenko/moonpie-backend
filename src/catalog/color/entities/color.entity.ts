import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('color')
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  value: string;
}
