import { JenisKelamin } from 'src/interface';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({ nullable: false })
  email_verified: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true, unique: true })
  telephone: string;

  @Column({ nullable: true })
  tempat_lahir: string;

  @Column({ nullable: true })
  tanggal_lahir: Date;

  @Column({
    type: 'enum',
    enum: JenisKelamin,
  })
  jenis_kelamin: JenisKelamin;

  @Column({ type: 'text' })
  slug: string;

  @Column({ nullable: true, type: 'text' })
  refresh_token: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
