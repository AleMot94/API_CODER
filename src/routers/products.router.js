import express from "express";
import logger from "../logger/index.js";
import { productController } from "../controllers/products.controller.js";

export const productsRouter = express.Router();

productsRouter.get("/", productController.getAll);

productsRouter.get("/:pid", (req, res) => {
  const id = req.params.pid;
  logger.info(id);
  req.res.send("obtiene producto por id");
});

productsRouter.post("/", (req, res) => {
  const product = req.body;
  logger.info(product);
  req.res.send("sube un producto nuevo");
});

productsRouter.put("/:pid", (req, res) => {
  const id = req.params.pid;
  const product = req.body;
  logger.info(id);
  logger.info(product);
  req.res.send("actualiza un producto por id");
});

productsRouter.delete("/:pid", (req, res) => {
  const id = req.params.pid;
  logger.info(id);
  req.res.send("elimina un producto por id");
});
