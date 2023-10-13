import { productsModel } from "./models/products.model.js";
import CustomError from "../../errors/custom-error.js";
import EErros from "../../errors/enums.js";

export default class ProductsDao {
  constructor() {}

  get = async (limit, page) => {
    try {
      const products = await productsModel.paginate(
        {},
        { limit: limit || 10, page: page || 1 }
      );
      return products;
    } catch (error) {
      throw CustomError.createError({
        name: "error collection",
        message: "product collection not found",
        code: EErros.COLLECTION_NOT_FOUND,
      });
    }
  };
}
