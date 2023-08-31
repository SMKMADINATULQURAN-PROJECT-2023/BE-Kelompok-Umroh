import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class Action extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action_name: string;

  @Column()
  description: string;

  @ManyToOne(() => Role, (role) => role.actions)
  @JoinColumn({ name: 'role_id' })
  roles: Role[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
