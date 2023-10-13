import { productsServices } from "../services/products.services.js";

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
}

export const productController = new ProductsController();
