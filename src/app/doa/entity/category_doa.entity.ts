import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Doa } from './doa.entity';
import { Admin } from 'src/app/admin/entities/admin.entity';
import { IsUnique } from 'src/utils/validator/unique.validator';

@Entity()
export class KategoriDoa extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsUnique([KategoriDoa, 'kategori_name'])
  kategori_name: string;

  @OneToMany(() => Doa, (doa) => doa.kategori_id, { cascade: true })
  doa_id: Doa[];

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
