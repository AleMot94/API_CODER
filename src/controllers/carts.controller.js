import { cartServices } from "../services/carts.services.js";
import logger from "../logger/index.js";

class CartController {
  async getAll(req, res) {
    try {
      const { page, limit } = req.query;
      const carts = await cartServices.getAllCarts(page, limit);
      const arrayCarts = carts.carts.flat();

      res.status(200).json({
        status: "succes",
        payload: arrayCarts,
        totalPages: carts.totalPages,
        prevPage: carts.prevPage,
        nextPage: carts.nextPage,
        page: carts.page,
        hasPrevPage: carts.hasPrevPage,
        hasNextPage: carts.hasNextPage,
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        payload: error,
      });
    }
  }
}

export const cartController = new CartController();
