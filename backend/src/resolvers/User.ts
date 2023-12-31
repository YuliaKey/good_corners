import { User, UserRoleType } from "../entities/user";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  InputType,
  Field,
  Authorized,
  Ctx,
  ObjectType,
} from "type-graphql";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

@ObjectType()
class UserInfo {
  @Field()
  isLoggedIn: boolean;
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  role: string;
}

@InputType({ description: "New recipe data" })
class UserInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Authorized("admin")
  @Query(() => [User])
  async allUsers() {
    const result = await User.find();
    return result;
  }

  @Query(() => User, { nullable: true })
  async findUserById(@Arg("id") id: number) {
    try {
      const user = await User.findOneByOrFail({
        id: id,
      });
      return user;
    } catch (err) {
      console.error("Error finding user by ID:", err);
      return null;
    }
  }

  @Mutation(() => String)
  async register(@Arg("newUserData") { email, password }: UserInput) {
    try {
      const newUser = new User();

      newUser.email = email;
      // Hash the password using Argon2
      newUser.hashedPassword = await argon2.hash(password);

      // Save the user to the database
      await newUser.save();

      return "User has been successfully registered";
    } catch (err) {
      console.log("Error regestering user:", err);
      return "Error creating user";
    }
  }

  @Query(() => String)
  async login(@Arg("userData") { email, password }: UserInput) {
    let payload: { email: string; role: UserRoleType };
    try {
      const user = await User.findOneByOrFail({ email });

      if (await argon2.verify(user.hashedPassword, password)) {
        // User successfully authenticated, generate a JWT
        payload = { email: user.email, role: user.role };
        const token = jwt.sign(payload, "mysupersecretkey");

        return token; // Return the generated JWT
      } else {
        throw new Error("Invalid password");
      }
    } catch (err) {
      console.log("Error authenticating user:", err);
      return "Invalid credentials";
    }
  }

  @Authorized("admin")
  @Query(() => String)
  async adminQuery() {
    return "you are admin";
  }

  @Query(() => UserInfo)
  async whoAmI(@Ctx() ctx: { email: string; role: string }) {
    if (ctx.email !== undefined) {
      return { ...ctx, isLoggedIn: true };
    } else {
      return { isLoggedIn: false };
    }
  }

  @Authorized("admin")
  @Mutation(() => String)
  async deleteUser(@Arg("userId") userId: string) {
    const userToDelete = await User.findOneByOrFail({
      id: Number.parseInt(userId),
    });
    await userToDelete.remove();
    return "user removed";
  }
}
