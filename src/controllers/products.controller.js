import { productsServices } from "../services/products.services.js";
import CustomError from "../errors/custom-error.js";
import EErros from "../errors/enums.js";

class ProductsController {
  async getAll(req, res) {
    try {
      const { limit, page, sort } = req.query;

      const allProductsWithPaginate = await productsServices.getAllProducts(
        limit,
        page,
        sort
      );

      const arrayProducts = allProductsWithPaginate.products;

      return res.status(200).json({
        status: "success",
        payload: arrayProducts,
        totalPages: allProductsWithPaginate.totalPages,
        prevPage: allProductsWithPaginate.prevPage,
        nextPage: allProductsWithPaginate.nextPage,
        page: allProductsWithPaginate.page,
        hasPrevPage: allProductsWithPaginate.hasPrevPage,
        hasNextPage: allProductsWithPaginate.hasNextPage,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        payload: error,
      });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.pid;

      const product = await productsServices.getProductById(id);

      res.json({
        status: "succes",
        payload: product,
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        payload: error,
      });
    }
  }

  async deleteById(req, res) {
    try {
      const id = req.params.pid;

      await productsServices.deleteProduct(id);

      res.status(200).json({
        status: "succes",
        payload: {},
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        payload: error,
      });
    }
  }

  async post(req, res) {
    try {
      if (!req.file) {
        throw CustomError.createError({
          name: "error file",
          code: EErros.FIELD_OBJET_ERROR,
        });
      }

      const product = req.body;
      const thumbnail = "http://localhost:8000/" + req.file.filename;

      const productAdd = await productsServices.addProduct(product, thumbnail);

      res.status(200).json({
        status: "succes",
        payload: productAdd,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        payload: error,
      });
    }
  }

  async putById(req, res) {
    try {
      if (!req.file) {
        throw CustomError.createError({
          name: "error file",
          code: EErros.FILE_ERROR,
        });
      }

      const product = req.body;
      const thumbnail = "http://localhost:8000/" + req.file.filename;
      const id = req.params.pid;

      const productUpdate = await productsServices.updateProduct(
        product,
        thumbnail,
        id
      );

      return res.status(201).json({
        status: "success",
        payload: productUpdate,
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        payload: error,
      });
    }
  }
}

export const productController = new ProductsController();
