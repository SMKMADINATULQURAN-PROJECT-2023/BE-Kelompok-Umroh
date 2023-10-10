import { KategoriDoa } from 'src/app/doa/entity/category_doa.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class DzikirPetang extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', collation: 'utf8mb4_unicode_ci' })
  arab: string;

  @Column({ type: 'text' })
  arti: string;

  @Column()
  diBaca: string;

  @ManyToOne(() => KategoriDoa)
  @JoinColumn({ name: 'kategori_id' })
  kategori_id: KategoriDoa;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
