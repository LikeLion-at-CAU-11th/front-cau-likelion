import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  seq: number;

  @Column()
  id: string;

  @Column()
  pw: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  salt: string;
}
