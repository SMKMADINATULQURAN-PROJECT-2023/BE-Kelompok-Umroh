import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../role/entity/role.entity';

@Entity()
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  id_avatar: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true, type: 'text' })
  refresh_token: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role_id: Role;

  @Column({ nullable: true, type: 'text' })
  slug: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
