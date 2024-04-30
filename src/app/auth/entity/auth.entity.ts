import { JenisKelamin } from 'src/utils/interface';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: false })
  username: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  email_verified: boolean;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  telephone: string;

  @Column({ nullable: true })
  alamat: string;

  @Column({ nullable: true, type: 'date' })
  tanggal_lahir: Date;

  @Column({
    type: 'enum',
    enum: JenisKelamin,
  })
  jenis_kelamin: JenisKelamin;

  @Column({ nullable: true, type: 'text' })
  refresh_token: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
