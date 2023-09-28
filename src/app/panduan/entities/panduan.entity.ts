import { JenisKelamin } from 'src/interface';
import { PrimaryGeneratedColumn, Entity, Column, BaseEntity } from 'typeorm';

@Entity()
export class Panduan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  video: string;

  @Column()
  id_video: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: JenisKelamin })
  kategori: JenisKelamin;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
