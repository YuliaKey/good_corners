import { Category } from "../entities/category";
import { Resolver, Query, Mutation, Arg, InputType, Field } from "type-graphql";

@InputType()
class CategoryInput {
  @Field()
  name: string;
}

@Resolver()
export class CategoryResolver {
  @Query(() => [Category])
  async allCategories() {
    const result = await Category.find();
    return result;
  }

  @Mutation(() => String)
  async deleteCategoryById(@Arg("id") id: number) {
    const categoryToDelete = await Category.findOneByOrFail({
      id: id,
    });
    categoryToDelete.remove();

    return "The category has been deleted";
  }

  @Mutation(() => String)
  async createCategory(@Arg("data") { name }: CategoryInput) {
    const category = Category.create({ name });
    category.save();
    console.log(name);
    return "The category has been created";
  }

  @Mutation(() => String)
  async updateCategoryById(
    @Arg("id") id: number,
    @Arg("data") { name }: CategoryInput
  ) {
    const category = await Category.findOneOrFail({
      where: { id },
    });

    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }

    category.name = name;
    await category.save();

    return "Category has been updated";
  }
}
