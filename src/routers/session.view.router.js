import express from "express";
import { sessionViewController } from "../controllers/session.view.controller.js";

export const viewSessionRouter = express.Router();

viewSessionRouter.get("/", sessionViewController.renderLogin);

viewSessionRouter.get("/login", sessionViewController.renderLogin);

viewSessionRouter.get("/register", sessionViewController.renderRegister);

viewSessionRouter.get("/profile", sessionViewController.renderProfile);

viewSessionRouter.get("/solo-admin", sessionViewController.renderSoloAdmin);

viewSessionRouter.get(
  "/failregister",
  sessionViewController.renderFailregister
);

viewSessionRouter.get("/faillogin", sessionViewController.renderFaillogin);
