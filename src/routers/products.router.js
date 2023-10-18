import express from "express";
import { productController } from "../controllers/products.controller.js";
import { uploader } from "../middleware/multer.js";
import { authAdmin } from "../validations/authUser.js";

export const productsRouter = express.Router();

productsRouter.get("/", productController.getAll);

productsRouter.get("/:pid", productController.getById);

productsRouter.delete("/:pid", authAdmin, productController.deleteById);

productsRouter.post("/", uploader.single("file"), productController.post);

productsRouter.put(
  "/:pid",
  authAdmin,
  uploader.single("file"),
  productController.putById
);
