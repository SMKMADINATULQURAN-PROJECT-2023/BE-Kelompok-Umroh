import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { KategoriDoa } from './category_doa.entity';
import { Admin } from 'src/app/admin/entities/admin.entity';
@Entity()
export class Doa extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', collation: 'utf8mb4_unicode_ci' })
  arab: string;

  @Column({ type: 'text' })
  latin: string;

  @Column({ type: 'text' })
  arti: string;

  @ManyToOne(() => KategoriDoa)
  @JoinColumn({ name: 'kategori_id' })
  kategori_id: KategoriDoa;

  @ManyToOne(() => Admin)
  @JoinColumn({ name: 'created_by' })
  created_by: Admin;

  @ManyToOne(() => Admin)
  @JoinColumn({ name: 'updated_by' })
  updated_by: Admin;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
