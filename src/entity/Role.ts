import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import User from './User';

@Entity()
export default class Role {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  description!: string;

  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}
