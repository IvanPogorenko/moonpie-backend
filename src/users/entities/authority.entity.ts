import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuthorityNameEnum } from '../../common/enums/authority-name.enum';

@Entity('authority')
export class Authority {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: AuthorityNameEnum, nullable: false })
  name: AuthorityNameEnum;

  @Column({ nullable: false })
  description: string;
}
