import { productsServices } from "../services/products.services.js";

class ProductsViewController {
  async getAll(req, res) {
    try {
      const { page, limit } = req.query;

      const user = req.session.user?.firstName || "No iniciaste sesión";
      const products = await productsServices.getAllProducts(limit, page);

      return res.render("products", {
        user: user,
        products: products.products,
        totalDocs: products.totalDocs,
        limit: products.limit,
        totalPages: products.totalPages,
        page: products.page,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
      });
    } catch (error) {
      return res.render("error-page", { error });
    }
  }
}

export const productsViewController = new ProductsViewController();
