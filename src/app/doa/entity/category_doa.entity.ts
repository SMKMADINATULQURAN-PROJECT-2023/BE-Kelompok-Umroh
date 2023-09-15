import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Doa } from './doa.entity';

@Entity()
export class KategoriDoa extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama_kategori: string;

  @OneToMany(() => Doa, (doa) => doa.kategori, { cascade: true })
  doa: Doa[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
