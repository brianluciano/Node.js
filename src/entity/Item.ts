import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Category from './Category';

@Entity()
export default class Item {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  image!: string;

  @Column()
  price!: number;

  @ManyToOne(() => Category, (category) => category.items)
  category!: Item;
}
