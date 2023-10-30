import { Admin } from 'src/app/admin/entities/admin.entity';
import { Status } from 'src/interface/status.interface';
import {
  BaseEntity,
  ManyToOne,
  JoinColumn,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class LokasiZiarah extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  thumbnail: string;

  @Column()
  id_thumbnail: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column({ type: 'enum', enum: Status })
  status: Status;

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
