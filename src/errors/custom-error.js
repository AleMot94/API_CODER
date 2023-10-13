import logger from "../logger/index.js";

export default class CustomError {
  static createError({ name = "Error", message, code }) {
    const error = new Error(message);
    error.name = name;
    error.code = code;

    logger.error(error.message);

    throw error;
  }
}
