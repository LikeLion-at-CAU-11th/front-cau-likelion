import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Feed {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  writer: string;
  @Column({ type: 'varchar', length: 500 })
  link: string;
  @Column({ type: 'varchar', length: 350 })
  content: string;
  @Column({ type: 'varchar', length: 500 })
  thumbnail: string;
  @Column()
  date: string;
}
