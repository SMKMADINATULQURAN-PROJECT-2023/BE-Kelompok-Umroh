import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DzikirPetang extends BaseEntity {
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

  @Column()
  diBaca: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
