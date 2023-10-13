import express from "express";
import logger from "../logger/index.js";
import { productController } from "../controllers/products.controller.js";
import { uploader } from "../middleware/multer.js";

export const productsRouter = express.Router();

productsRouter.get("/", productController.getAll);

productsRouter.get("/:pid", productController.getById);

productsRouter.delete("/:pid", productController.deleteById);

productsRouter.post("/", uploader.single("file"), productController.post);

productsRouter.put("/:pid", uploader.single("file"), productController.putById);
