import express from "express";
import CustomError from "../errors/custom-error.js";
import EErros from "../errors/enums.js";

export const loggerTestRouter = express.Router();

loggerTestRouter.get("/", async (req, res) => {
  try {
    throw CustomError.createError({
      name: "nombre del error",
      message: "mensaje del error",
      code: EErros.ID_NOT_FOUND,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      payload: error,
    });
  }
});
