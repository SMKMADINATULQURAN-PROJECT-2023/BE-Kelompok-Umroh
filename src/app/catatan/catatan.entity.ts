import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../auth/auth.entity';
import { Siswa } from '../siswa/siswa.entity';

export enum Kategori {
  PELANGGARAN = 1,
  PRESTASI = 2,
}

@Entity()
export class Catatan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  tanggal: Date;

  @Column({
    type: 'enum',
    enum: Kategori,
    default: Kategori.PELANGGARAN,
  })
  kategori: Kategori;

  @Column({ nullable: false, type: 'text' })
  keterangan: string;

  @Column({ nullable: false })
  poin: number;

  @Column({ nullable: false })
  kelas: string;

  @Column({ nullable: false })
  ta_id: number;

  @Column({ nullable: false, default: 0 })
  updated_count: number;

  @ManyToOne(() => Siswa, (v) => v.catatan)
  @JoinColumn({ name: 'siswa_id' })
  siswa: Siswa;

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
