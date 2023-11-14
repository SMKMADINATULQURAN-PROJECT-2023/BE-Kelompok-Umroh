import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Action } from '../../action/entity/action.entity';
import { UserRole } from 'src/interface';
import { Access } from 'src/app/access/entity/access.entity';
import { Menu } from 'src/app/menu/entity/menu.entity';

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role_name: UserRole;

  @OneToMany(() => Action, (action) => action.role_id)
  action_id: Action[];

  @ManyToMany(() => Access, (access) => access.role_id)
  @JoinTable({
    name: 'roles_accesses_menus',
    joinColumns: [{ name: 'role_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'access_id', referencedColumnName: 'id' }],
  })
  access_id: Access[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
