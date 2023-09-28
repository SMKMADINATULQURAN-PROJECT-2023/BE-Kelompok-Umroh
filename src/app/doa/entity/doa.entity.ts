import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { KategoriDoa } from './category_doa.entity';

@Entity()
export class Doa extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama: string;

  @Column({ type: 'text', collation: 'utf8mb4_unicode_ci' })
  arab: string;

  @Column({ type: 'text' })
  latin: string;

  @Column({ type: 'text' })
  arti: string;

  @ManyToOne(() => KategoriDoa)
  @JoinColumn({ name: 'kategori_id' })
  kategori_id: KategoriDoa;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
