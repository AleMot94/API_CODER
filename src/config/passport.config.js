import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { UserModel } from "../DAO/mongo-dev/models/user.model.js";
import fetch from "node-fetch";
import logger from "../logger/index.js";

const LocalStrategy = local.Strategy;

export function initPassport() {
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await UserModel.findOne({ email: username });
          if (!user) {
            logger.error("User Not Found with username (email) " + username);
            return done(null, false);
          }
          if (!isValidPassword(password, user.password)) {
            logger.error("Invalid Password");
            return done(null, false);
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          const { email, firstName, lastName, age } = req.body;
          let user = await UserModel.findOne({ email });
          if (user) {
            logger.error("User already exists or empty fields");
            return done(null, false);
          }

          const newUser = {
            email,
            firstName,
            lastName,
            age,
            admin: false,
            password: createHash(password),
          };
          let userCreated = await UserModel.create(newUser);
          logger.info(userCreated);
          logger.error("User Registration succesful");
          return done(null, userCreated);
        } catch (e) {
          logger.error("Error in register");
          logger.error(e);
          return done(e);
        }
      }
    )
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.972ed3eb4874f05b",
        clientSecret: "7f1e06e6c9e48e0c173e893ea092ecba0d250af5",
        callbackURL: "http://localhost:8000/api/session/githubcallback",
      },
      async (accesToken, _, profile, done) => {
        try {
          const res = await fetch("https://api.github.com/user/emails", {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: "Bearer " + accesToken,
              "X-Github-Api-Version": "2022-11-28",
            },
          });
          const emails = await res.json();
          const emailDetail = emails.find((email) => email.verified == true);

          if (!emailDetail) {
            logger.error("cannot get a valid email for this user");
            return done(new Error("cannot get a valid email for this user"));
          }
          profile.email = emailDetail.email;

          let user = await UserModel.findOne({ email: profile.email });
          if (!user) {
            const newUser = {
              email: profile.email,
              firstName: profile._json.name || profile._json.login || "noname",
              lastName: "nolast",
              admin: false,
              password: "nopass",
            };
            let userCreated = await UserModel.create(newUser);
            logger.info("User Registration succesful");
            return done(null, userCreated);
          } else {
            logger.error("User already exists");
            return done(null, user);
          }
        } catch (e) {
          logger.error("Error en auth github");
          logger.error(e);
          return done(e);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findById(id);
    done(null, user);
  });
}
