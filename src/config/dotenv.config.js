import dotenv from "dotenv";

export const entorno = {
  MODE: process.argv[2],
};

if (process.argv[2] != "DEV" && process.argv[2] != "PROD") {
  console.log("argumentos incorrectos PROD o DEV");
  process.exit();
}
dotenv.config({
  path: process.argv[2] === "DEV" ? "./.env.development" : "./.env.production",
});

entorno.PORT = process.env.PORT;
entorno.MONGO_URL = process.env.MONGO_URL;
entorno.NODE_ENV = process.env.NODE_ENV;
