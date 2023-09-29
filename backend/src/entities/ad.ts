import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category";
import { Tag } from "./tag";
import { IsNumber, Length } from "class-validator";

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(3, 255)
  title: string;

  @Column()
  @IsNumber()
  price: number;

  @Column()
  @Length(5, 255)
  description: string;

  @Column()
  imageUrl: string;

  @Column()
  @Length(5, 200)
  location: string;

  @Column()
  @Length(1, 255)
  owner: string;

  @CreateDateColumn()
  createdAt: Date;

  // N a has only 1 category
  // a category can contain multiple ads
  // Many ro One relationship ( many ads in one category)
  @ManyToOne(() => Category, (category) => category.ads)
  category: Category;

  @ManyToMany(() => Tag, (tag) => tag.ads)
  @JoinTable()
  tags: Tag[];
}
