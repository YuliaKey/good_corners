import { Request, Response } from "express";
import { Tag } from "../entities/tag";

const tagController = {
  read: async (_req: Request, res: Response) => {
    try {
      const result = await Tag.find({ relations: { ads: true } });
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
      await Tag.save(req.body);
      res.send("Tag has been created");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const tagToDelete = await Tag.findOneByOrFail({
        id: req.body.id,
      });
      tagToDelete.remove();
      res.send("tag has been deleted");
    } catch (error) {
      console.log(error);
    }
  },

  put: async (req: Request, res: Response) => {
    try {
      const oldTag = await Tag.findOneByOrFail({
        id: req.body.idToEdit,
      });
      Tag.save({ ...oldTag, ...req.body.newTag });
      res.send("Tag has been updated");
    } catch (error) {
      console.log(error);
    }
  },
};

export default tagController;
