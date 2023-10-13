import { connect } from "mongoose";
import { entorno } from "../config/dotenv.config.js";
import logger from "../logger/index.js";
import CustomError from "../errors/custom-error.js";
import EErros from "../errors/enums.js";

const mongoUrl = entorno.MONGO_URL;

async function connectMongoose() {
  try {
    await connect(mongoUrl);
    logger.info("Connected to mongo");
  } catch (error) {
    throw CustomError.createError({
      name: "conection mongo",
      message: "could not connect to mongo",
      code: EErros.NOT_CONECT_MONGO,
    });
  }
}

export default async function connectMongo() {
  try {
    await connectMongoose();
  } catch (error) {
    return error;
  }
}
