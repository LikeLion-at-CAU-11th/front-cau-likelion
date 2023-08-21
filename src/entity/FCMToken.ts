import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FCMToken {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  token: string;
}
