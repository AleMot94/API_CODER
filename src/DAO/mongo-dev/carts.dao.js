import { CartsModel } from "./models/carts.model.js";
import CustomError from "../../errors/custom-error.js";
import EErros from "../../errors/enums.js";
import logger from "../../logger/index.js";

export default class CartDao {
  constructor() {}

  get = async (limit, page) => {
    try {
      const carts = await CartsModel.paginate(
        {},
        { limit: limit || 5, page: page || 1, populate: "products.product" }
      );
      return carts;
    } catch (error) {
      throw CustomError.createError({
        name: "error collection",
        message: "carts collection not found",
        code: EErros.COLLECTION_NOT_FOUND,
      });
    }
  };
}
