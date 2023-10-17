import express from "express";
import { cartController } from "../controllers/carts.controller.js";

export const cartsRouter = express.Router();

cartsRouter.get("/", cartController.getAll);

cartsRouter.get("/:cid", cartController.getById);

cartsRouter.post("/", cartController.addCart);

cartsRouter.post("/:cid/product/:pid", cartController.addProdInCart);

cartsRouter.delete("/:cid", cartController.deleteAllProdsInCart);

cartsRouter.delete("/:cid/product/:pid", cartController.deleteProdInCart);

cartsRouter.put("/:cid", cartController.updateCartWithNewProducts);

cartsRouter.put("/:cid/product/:pid", cartController.updateProdQuantityInCart);
