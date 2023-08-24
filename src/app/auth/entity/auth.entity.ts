import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserFacebook } from './facebook.entity';
import { UserGoogle } from './google.entity';
import { Role } from './role.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  telephone: string;

  @Column({ nullable: true })
  tempat_lahir: string;

  @Column({ nullable: true })
  tanggal_lahir: Date;

  @OneToOne(() => UserFacebook, (u) => u.user)
  @JoinColumn({ name: 'UserFacebook_email', referencedColumnName: 'email' })
  facebook: UserFacebook;

  @OneToOne(() => UserGoogle, (u) => u.user)
  @JoinColumn({ name: 'UserGoogle_email', referencedColumnName: 'email' })
  google: UserGoogle;

  @OneToOne(() => Role)
  @JoinColumn()
  role: Role;

  @Column({ nullable: true })
  refresh_token: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
