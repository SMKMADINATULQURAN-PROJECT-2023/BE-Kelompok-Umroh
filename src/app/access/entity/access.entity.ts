import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Menu } from '../../menu/entity/menu.entity';
import { Role } from 'src/app/role/entity/role.entity';
import { Admin } from 'src/app/admin/entities/admin.entity';

@Entity()
export class Access extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Role, (role) => role.access_id)
  role_id: Role[];

  @ManyToMany(() => Menu, (menu) => menu.access_id)
  @JoinTable({
    name: 'roles_accesses_menus',
    joinColumns: [{ name: 'access_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'menu_id', referencedColumnName: 'id' }],
  })
  menu_id: Menu[];

  @ManyToOne(() => Admin)
  @JoinColumn({ name: 'created_by' })
  created_by: Admin;

  @ManyToOne(() => Admin)
  @JoinColumn({ name: 'updated_by' })
  updated_by: Admin;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
