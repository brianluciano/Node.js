import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Item from './Item';

@Entity()
export default class Category {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  image!: string;

  @OneToMany(() => Item, (item) => item.category)
  items!: Item[];
}
