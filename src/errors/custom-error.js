import { logger } from "../utils/logger.js";

export default class CustomError {
  static createError({ cause, message, code }) {
    const error = new Error(message);
    error.status = "error";
    error.cause = cause;
    error.code = code;

    logger.warn(error);

    throw error;
  }
}
