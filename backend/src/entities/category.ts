import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./ad";
import { Length } from "class-validator";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 255)
  name: string;

  // a category can contain multiple ads
  // One to Many relationship
  @OneToMany(() => Ad, (ad) => ad.category)
  ads: Ad[];
}
