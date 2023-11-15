import { Admin } from 'src/app/admin/entities/admin.entity';
import { Menu } from 'src/app/menu/entity/menu.entity';
import { Role } from 'src/app/role/entity/role.entity';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  Column,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity('admins_permissions')
export class RolesAccessMenus extends BaseEntity {
  @PrimaryColumn({ name: 'admin_id' })
  adminId: number;

  @PrimaryColumn({ name: 'role_id' })
  roleId: number;

  @PrimaryColumn({ name: 'menu_id' })
  menuId: number;

  @Column({ type: 'text' })
  permission: string;

  @ManyToOne(() => Admin)
  @JoinColumn({ name: 'admin_id', referencedColumnName: 'id' })
  admins: Admin[];

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  roles: Role[];

  @ManyToOne(() => Menu)
  @JoinColumn({ name: 'menu_id', referencedColumnName: 'id' })
  menus: Menu[];
}
