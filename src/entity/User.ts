import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Role from './Role';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  lastName!: string;

  @Column({ nullable: false, unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  age!: number;

  @ManyToOne(() => Role, (role) => role.users)
  role!: Role;
}
