import { Tag } from "../entities/tag";
import { Resolver, Query, Mutation, Arg, InputType, Field } from "type-graphql";

@InputType()
class TagInput {
  @Field()
  name: string;
}

@Resolver()
export class TagResolver {
  @Query(() => [Tag])
  async allTags() {
    const result = await Tag.find();
    return result;
  }

  @Mutation(() => String)
  async deleteTagById(@Arg("id") id: number) {
    const tagToDelete = await Tag.findOneByOrFail({
      id: id,
    });
    tagToDelete.remove();

    return "The category has been deleted";
  }

  @Mutation(() => String)
  async createTag(@Arg("data") { name }: TagInput) {
    const tag = Tag.create({ name });
    tag.save();
    console.log(name);
    return "The tag has been created";
  }

  @Mutation(() => String)
  async updateTagById(@Arg("id") id: number, @Arg("data") { name }: TagInput) {
    const tag = await Tag.findOneOrFail({
      where: { id },
    });

    if (!tag) {
      throw new Error(`Tag with ID ${id} not found`);
    }

    tag.name = name;
    await tag.save();

    return "Tag has been updated";
  }
}
