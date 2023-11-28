import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./ad";
import { Field, ObjectType } from "type-graphql";
@ObjectType()
@Entity()
export class Tag extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Ad])
  @ManyToMany(() => Ad, (ad) => ad.tags)
  @JoinTable()
  ads: Ad[];
}
