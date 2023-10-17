import logger from "../logger/index.js";
import { cartServices } from "../services/carts.services.js";

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

  async getById(req, res) {
    try {
      const id = req.params.cid;

      const cart = await cartServices.getCartById(id);

      res.status(200).json({
        status: "succes",
        payload: cart,
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        payload: error,
      });
    }
  }

  async addCart(req, res) {
    try {
      const cart = await cartServices.addCart();

      res.status(200).json({
        status: "success",
        payload: cart,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        payload: error,
      });
    }
  }

  async deleteAllProdsInCart(req, res) {
    try {
      const idCart = req.params.cid;

      await cartServices.deleteAllProdsCart(idCart);

      res.status(200).json({
        status: "success",
        payload: {},
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        payload: error,
      });
    }
  }

  async addProdInCart(req, res) {
    try {
      const idCart = req.params.cid;
      const idProduct = req.params.pid;
      const { quantity } = req.query;
      logger.info(idCart);

      await cartServices.addProductToCart(idCart, idProduct, quantity);

      res.status(200).json({
        status: "success",
        payload: {},
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        payload: error,
      });
    }
  }

  async deleteProdInCart(req, res) {
    try {
      const idCart = req.params.cid;
      const idProduct = req.params.pid;

      await cartServices.deleteProductInCart(idCart, idProduct);

      res.status(200).json({
        status: "success",
        payload: {},
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        payload: error,
      });
    }
  }

  async updateCartWithNewProducts(req, res) {
    try {
      const idCart = req.params.cid;
      const newProducts = req.body;
      await cartServices.updateCart(idCart, newProducts);

      res.status(200).json({
        status: "success",
        payload: {},
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        payload: error,
      });
    }
  }

  async updateProdQuantityInCart(req, res) {
    try {
      const idCart = req.params.cid;
      const idProduct = req.params.pid;
      const quantity = parseInt(req.body.quantity);

      await cartServices.updateProdQuantityInCart(idCart, idProduct, quantity);
      res.status(200).json({
        status: "success",
        payload: {},
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
