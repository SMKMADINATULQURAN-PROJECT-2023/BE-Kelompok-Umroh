import { JenisKelamin } from 'src/interface';
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Admin } from 'src/app/admin/entities/admin.entity';

@Entity()
export class Panduan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: JenisKelamin })
  kategori: JenisKelamin;

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
