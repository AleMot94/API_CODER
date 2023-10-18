import express from "express";
import passport from "passport";
import { sessionController } from "../controllers/session.controller.js";

export const routerSession = express.Router();

routerSession.get("/current", /* authView, */ sessionController.current);

// PASSPORT LOCAL
routerSession.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  sessionController.register
);

routerSession.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  sessionController.login
);

// PASSPORT CON GITHUB
routerSession.get(
  "/github",
  passport.authenticate("github", { scope: ["user.email"] })
);

routerSession.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/faillogin" }),
  sessionController.loginGithub
);

routerSession.get("/logout", sessionController.logout);
