import { Request, Response } from "express";
import { Ad } from "../entities/ad";
import { validate } from "class-validator";
import { Like } from "typeorm";

const adsController = {
  read: async (req: Request, res: Response) => {
    let result: Ad[];

    console.log(req.query.category);
    try {
      const category = req.query.category as string;
      if (category) {
        result = await Ad.find({
          where: { category: { name: category } },
          relations: { category: true, tags: true },
        });
      } else if (req.query.title) {
        result = await Ad.find({
          where: { title: Like(`%${req.query.title}%`) },
          relations: { category: true, tags: true },
        });
      } else {
        result = await Ad.find({
          relations: { category: true, tags: true },
        });
      }
      res.send(result);
    } catch (error) {
      console.log(error);
    }

    // db.all("SELECT * FROM ad", (err, rows) => {
    //   if (err) {
    //     console.log("Error fetching ads:", err);
    //     res.status(500).send("An error occurred while fetching ads.");
    //   } else {
    //     res.send(rows);
    //   }
    // });
  },
  readOne: async (req: Request, res: Response) => {
    try {
      const result = await Ad.find({
        where: {
          id: Number.parseInt(req.params.id),
        },
        relations: { category: true },
      });
      if (result.length !== 1) {
        throw new Error(`query error`);
      }
      res.send(result[0]);
    } catch (err) {
      console.log("error", err);
      res.send("an error occured while reading one ad");
    }
  },

  create: async (req: Request, res: Response) => {
    console.log(req.body);
    try {
      const newAd = Ad.create(req.body);
      const errors = await validate(newAd);
      if (errors.length > 0) {
        throw new Error(`Validation failed!`);
      } else {
        await newAd.save();
      }
      res.send("Ad has been created");
    } catch (err) {
      res.status(400).send("An error occured while creating the ad");
    }

    // sqlite SQL requests without using ORM
    // db.run(
    //   `INSERT INTO ad (title, description, owner, price, picture, location)VALUES (
    //   "${req.body.title}",
    //   "${req.body.description}",
    //   "${req.body.owner}",
    //   "${req.body.price}",
    //   "${req.body.picture}",
    //   "${req.body.location}"
    //   )`,
    //   (err: any) => {
    //     if (err) {
    //       console.log("Error adding ads:", err);
    //       res.status(500).send("An error occurred while adding the ad.");
    //     } else {
    //       res.send("The ad has been added");
    //     }
    //   }
    // );
    // ads.push(req.body);
  },
  delete: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await Ad.delete({ id });
      // another way to do itwithout params
      // const adToDelete = await Ad.findOneByOrFail({ id: req.body.id });
      // adToDelete.remove();
      res.send("Ad has been deleted");
    } catch (error) {
      console.log(error);
    }
    // ads.splice(idToDelete, 1);
    // ads = ads.filter((ad) => ad.id !== req.body.id);
    // const idToDelete = req.body.id;
    // db.run("DELETE FROM ad WHERE id= ?", idToDelete, (err: any) => {
    //   if (err) {
    //     console.error("Error deleting ad:", err);
    //     res.status(500).send("An error occurred while deleting the ad.");
    //   } else {
    //     res.send("The ad has been deleted");
    //   }
    // });
  },
  put: async (req: Request, res: Response) => {
    try {
      const oldAd = await Ad.findOneByOrFail({ id: req.body.idToEdit });
      Ad.save({ ...oldAd, ...req.body.newAd });
      res.send("The ad has been updated");
    } catch (err) {
      console.log(err);
      res.send("there has been an error while updating the ad");
    }

    // another way :
    // try {
    //   const oldAd = await Ad.findOneByOrFail({ id: req.body.idToEdit });
    //   Ad.save({ ...oldAd, ...req.body.newAd });
    // } catch (error) {
    //   console.log(error);
    // }

    //just with sqlite, no TypeORM
    // ads[req.body.idToEdit] = req.body.newAd;
    // db.run(
    //   `
    //     UPDATE ad
    //     SET
    //       title=?,
    //       description=?,
    //       owner=?,
    //       price=?,
    //       picture=?,
    //       location=?
    //     WHERE id=?
    //   `,
    //   [
    //     req.body.newAd.title,
    //     req.body.newAd.description,
    //     req.body.newAd.owner,
    //     req.body.newAd.price,
    //     req.body.newAd.picture,
    //     req.body.newAd.location,
    //     req.body.idToEdit,
    //   ],
    //   (err) => {
    //     if (err) {
    //       console.error("Error deleting ad:", err);
    //       res.status(500).send("An error occurred while deleting the ad.");
    //     } else {
    //       res.send("The ad has been edited");
    //     }
    //   }
    // );
  },
};

export default adsController;
