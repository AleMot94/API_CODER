import express from "express";
import { cartController } from "../controllers/carts.controller.js";

export const cartsRouter = express.Router();

cartsRouter.get("/", cartController.getAll);
