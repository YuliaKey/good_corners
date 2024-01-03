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

import { CategoryResolver } from "./resolvers/Category";
import { ApolloServer } from "@apollo/server";
import { AdResolver } from "./resolvers/Ad";
import { TagResolver } from "./resolvers/Tag";
import { Category } from "./entities/category";
import { UserResolver } from "./resolvers/User";

const start = async () => {
  await dataSource.initialize();

  // If no category was created, create one so the ad form works
  const categories = await Category.find();
  if (categories.length === 0) {
    await Category.save({ name: "miscellaneous" });
  }

  const schema = await buildSchema({
    resolvers: [CategoryResolver, AdResolver, TagResolver, UserResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {});

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
