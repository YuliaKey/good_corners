import { Request, Response } from "express";
import { Category } from "../entities/category";

const categoryController = {
  read: async (_req: Request, res: Response) => {
    try {
      const result = await Category.find();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
    // db.all("SELECT * FROM category", (err, rows) => {
    //   if (err) {
    //     console.log("Error fetching categories:", err);
    //     res.status(500).send("An error occurred while fetching categories.");
    //   } else {
    //     res.send(rows);
    //   }
    // });
  },

  create: async (req: Request, res: Response) => {
    try {
      await Category.save(req.body);
      console.log(req.body);
      res.send("Category has been created");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
    // db.run(
    //   `INSERT INTO category (name) VALUES (
    //   "${req.body.name}"
    //   )`,
    //   (err: any) => {
    //     if (err) {
    //       console.log("Error adding a category:", err);
    //       res.status(500).send("An error occurred while adding the category.");
    //     } else {
    //       res.send("The category has been added");
    //     }
    //   }
    // );
  },

  delete: async (req: Request, res: Response) => {
    try {
      const categoryToDelete = await Category.findOneByOrFail({
        id: req.body.id,
      });
      categoryToDelete.remove();
      res.send("Category has been deleted");
    } catch (error) {
      console.log(error);
    }
  },

  put: async (req: Request, res: Response) => {
    try {
      const oldCategory = await Category.findOneByOrFail({
        id: req.body.idToEdit,
      });
      Category.save({ ...oldCategory, ...req.body.newCategory });
      res.send("Category has been updated");
    } catch (error) {
      console.log(error);
    }
  },
};

export default categoryController;
