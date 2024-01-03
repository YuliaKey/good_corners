import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { IsNotEmpty, Length } from "class-validator";
@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  @Length(6, 50)
  email: string;

  @Column()
  @IsNotEmpty()
  hashedPassword: string;
}
