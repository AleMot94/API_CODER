import express from "express";
import { productsViewController } from "../controllers/products.view.controller.js";
import { authUser } from "../validations/authUser.js";

export const viewProductsRouter = express.Router();

viewProductsRouter.get("/", productsViewController.getAll);
