import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../auth/entity/auth.entity';
import { Catatan } from '../catatan/catatan.entity';

@Entity()
export class Siswa extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nama_siswa: string;

  @Column({ nullable: true })
  nisn: string;

  @Column({ nullable: false })
  kelas: string;

  @Column({ nullable: true })
  tempat_lahir: string;

  @Column({ nullable: true })
  tanggal_lahir: Date;

  @Column({ nullable: false })
  jenis_kelamin: string;

  @OneToMany(() => Catatan, (v) => v.siswa)
  catatan: Catatan[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updated_by: User;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
