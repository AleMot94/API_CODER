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

  getById = async (id) => {
    try {
      const productFind = await productsModel.findOne({ _id: id });
      return productFind;
    } catch (error) {
      throw CustomError.createError({
        name: "error prod ID",
        message: "product with id: " + id + " not found",
        code: EErros.ID_NOT_FOUND,
      });
    }
  };

  deleteProd = async (id) => {
    try {
      const deleted = await productsModel.deleteOne({ _id: id });
      return deleted;
    } catch (error) {
      throw CustomError.createError({
        name: "error ID",
        message: "product with id: " + id + " not found",
        code: EErros.ID_NOT_FOUND,
      });
    }
  };

  post = async (title, description, price, code, stock, status, thumbnail) => {
    try {
      const product = await productsModel.create({
        title,
        description,
        price,
        code,
        stock,
        status,
        thumbnail,
      });

      return product;
    } catch (error) {
      throw CustomError.createError({
        name: "error objet or code exist",
        message: "existing code or wrong fields",
        code: EErros.FIELD_OBJET_ERROR,
      });
    }
  };

  put = async (
    title,
    description,
    price,
    code,
    stock,
    status,
    thumbnail,
    id
  ) => {
    try {
      const product = await productsModel.updateOne(
        { _id: id },
        { title, description, price, code, stock, status, thumbnail }
      );

      return product;
    } catch (error) {
      throw CustomError.createError({
        name: "error ID",
        message: "product with id: " + id + " not found",
        code: EErros.ID_NOT_FOUND,
      });
    }
  };
}
