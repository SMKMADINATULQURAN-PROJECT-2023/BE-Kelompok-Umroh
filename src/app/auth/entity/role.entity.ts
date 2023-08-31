import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Action } from './action.entity';
import { User } from './auth.entity';
export enum UserRole {
  ADMIN = 'Admin',
  CONTENTCREATOR = 'Content Creator',
  TRAVEL = 'Travel',
}
@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.ADMIN,
  })
  role_name: UserRole;

  @OneToMany(() => Action, (action) => action.roles)
  actions: Action[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
