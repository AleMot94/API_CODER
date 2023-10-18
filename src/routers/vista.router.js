import express from "express";
import { vistaController } from "../controllers/vista.controller.js";
//import { sessionViewController } from "../controllers/session.view.controller.js";

export const vistaRouter = express.Router();

vistaRouter.get("/", vistaController.renderLogin);
