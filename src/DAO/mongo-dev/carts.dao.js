import { CartsModel } from "./models/carts.model.js";
import CustomError from "../../errors/custom-error.js";
import EErros from "../../errors/enums.js";

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

  getById = async (id) => {
    try {
      const cartFind = await CartsModel.findOne({ _id: id });

      return cartFind;
    } catch (error) {
      throw CustomError.createError({
        name: "error cart ID",
        message: "carts id not found",
        code: EErros.ID_NOT_FOUND,
      });
    }
  };

  getByIdPopulate = async (id) => {
    try {
      const cartFind = await CartsModel.findOne({ _id: id }).populate(
        "products.product"
      );
      return cartFind;
    } catch (error) {
      throw CustomError.createError({
        name: "error ID",
        message: "carts id not found",
        code: EErros.ID_NOT_FOUND,
      });
    }
  };

  cartUpdate = async (idCart, cart) => {
    const cartUpdate = await CartsModel.updateOne({ _id: idCart }, cart);
    return cartUpdate;
  };

  post = async (products) => {
    try {
      const cart = await CartsModel.create({ products });
      return cart;
    } catch (error) {
      throw CustomError.createError({
        name: "error add cart",
        message: "could not add new cart",
        code: EErros.NOT_CONECT_MONGO,
      });
    }
  };
}
