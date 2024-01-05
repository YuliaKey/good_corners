import "reflect-metadata";
// import express from "express";
// import sqlite3 from "sqlite3";
// import adsController from "./controllers/adsController";
// import categoryController from "./controllers/categoryController";
// import tagController from "./controllers/tagController";
// import cors from "cors";
import dataSource from "./config/db";
import { buildSchema } from "type-graphql";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as jwt from "jsonwebtoken";
import * as argon2 from "argon2";

import { CategoryResolver } from "./resolvers/Category";
import { ApolloServer } from "@apollo/server";
import { AdResolver } from "./resolvers/Ad";
import { TagResolver } from "./resolvers/Tag";
import { Category } from "./entities/category";
import { UserResolver } from "./resolvers/User";
import { User } from "./entities/user";
import { Ad } from "./entities/ad";

const start = async () => {
  await dataSource.initialize();

  // If no category was created, create one so the ad form works
  const categories = await Category.find();
  if (categories.length === 0) {
    await Category.save({ name: "miscellaneous" });
  }

  // If no users were created, create an admin and a user
  const users = await User.find();
  if (users.length === 0) {
    // creating users
    const alice = new User();
    alice.email = "alice@gmail.com";
    alice.hashedPassword = await argon2.hash("password");
    alice.role = "admin";
    alice.save();

    const bob = new User();
    bob.email = "bob@gmail.com";
    bob.hashedPassword = await argon2.hash("password");
    bob.save();
  }

  // if no ads, create some
  const ads = await Ad.find();
  if (ads.length === 0) {
    // creating ads
    const categories = await Category.find();
    const bike = new Ad();
    bike.category = categories[0];
    bike.description = "This bike is to sell";
    bike.title = "I'm selling my bike";
    bike.location = "Paris";
    bike.owner = "bob@email.com";
    bike.imageUrl =
      "https://voltbikes.co.uk/images/e-bikes/pulse-xt-electric-bike.jpg";
    bike.price = 200;
    bike.save();

    const car = new Ad();
    car.category = categories[0];
    car.description = "This car is to sell";
    car.title = "I'm selling my car";
    car.location = "Paris";
    car.owner = "bob@email.com";
    car.imageUrl = "https://www.entreprendre.fr/wp-content/uploads/wx-3.jpg";
    car.price = 200;
    car.save();
  }

  const schema = await buildSchema({
    resolvers: [CategoryResolver, AdResolver, TagResolver, UserResolver],
    authChecker: ({ context }, roles) => {
      if (roles.length > 0 && context.email) {
        if (roles.includes(context.role)) {
          return true;
        } else {
          return false;
        }
      }
      if (roles.length === 0 && context.email) {
        return true;
      }
      return false;
    },
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      // console.log("headers", req.headers.authorization);
      const token = req.headers.authorization?.split("Bearer ")[1];
      // console.log(token);
      if (token) {
        const payload = jwt.verify(token, "mysupersecretkey");
        // console.log("payload", payload);
        return payload;
      }
      return "This is a fake context";
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

start();

// const app = express();
// const port = 4000;

// export const db = new sqlite3.Database("good_corner.sqlite");

// app.use(cors());
// app.use(express.json());

// // app.get("/", (res) => {
// //   res.send("Hello World!");
// // });

// app.get("/ad", adsController.read);
// app.get("/ad/:id", adsController.readOne);
// app.post("/ad", adsController.create);
// app.delete("/ad/:id", adsController.delete);
// app.put("/ad", adsController.put);

// app.get("/category", categoryController.read);
// app.post("/category", categoryController.create);
// app.delete("/category", categoryController.delete);
// app.put("/category", categoryController.put);

// app.get("/tag", tagController.read);
// app.post("/tag", tagController.create);
// app.delete("/tag", tagController.delete);
// app.put("/tag", tagController.put);

// app.listen(port, async () => {
//   await dataSource.initialize();
//   console.log(`Example app listening on port ${port}`);
// });
