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
import { ObjectType, Field } from "type-graphql";
import { Category } from "./category";
import { Tag } from "./tag";
import { IsNumber, Length } from "class-validator";

@ObjectType()
@Entity()
export class Ad extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @Length(3, 255)
  title: string;

  @Field()
  @Column()
  @IsNumber()
  price: number;

  @Field()
  @Column()
  @Length(5, 255)
  description: string;

  @Field()
  @Column()
  imageUrl: string;

  @Field()
  @Column()
  @Length(5, 200)
  location: string;

  @Field()
  @Column()
  @Length(1, 255)
  owner: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  // N a has only 1 category
  // a category can contain multiple ads
  // Many ro One relationship ( many ads in one category)
  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.ads)
  category: Category;

  @Field(() => [Tag])
  @ManyToMany(() => Tag, (tag) => tag.ads)
  @JoinTable()
  tags: Tag[];
}
