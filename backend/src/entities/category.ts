import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Ad } from "./ad";
import { Length } from "class-validator";

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @Length(1, 255)
  name: string;

  // a category can contain multiple ads
  // One to Many relationship
  @Field(() => [Ad])
  @OneToMany(() => Ad, (ad) => ad.category)
  ads: Ad[];
}
