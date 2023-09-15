import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Travel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama_travel: string;

  @Column()
  nama_perusahaan: string;

  @Column()
  email: string;

  @Column()
  nomor_izin_umrah: string;

  @Column()
  nomor_izin_haji: string;

  @Column()
  paket: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
