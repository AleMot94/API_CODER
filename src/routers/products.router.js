import express from "express";
//import { loggerDev } from "../logger/logger.js";
import logger from "../logger/index.js";

export const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
  try {
    /* throw CustomError.createError({
      cause: "nombre del error",
      message: "mensaje del error",
      code: EErros.ID_NOT_FOUND,
    }); */

    throw "este es el error";
  } catch (error) {
    logger.warn(error);
    logger.error(error);
    return res.status(500).json({
      status: "error",
      payload: error,
    });
  }
});
