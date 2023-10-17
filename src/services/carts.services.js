import CartDao from "../DAO/mongo-dev/carts.dao.js";
import ProductsDao from "../DAO/mongo-dev/products.dao.js";
import CustomError from "../errors/custom-error.js";
import EErros from "../errors/enums.js";
import mongoose from "mongoose";
import logger from "../logger/index.js";

const cartDao = new CartDao();
const productDao = new ProductsDao();

class CartServices {
  async getAllCarts(limit, page) {
    try {
      const carts = await cartDao.get(limit, page);

      const cartsFlat = carts.docs.map((cart) => [
        { cart: cart._id, products: cart.products },
      ]);

      const cartsProductsFlatPaginate = {
        carts: cartsFlat,
        totalDocs: carts.totalDocs,
        limit: carts.limit,
        totalPages: carts.totalPages,
        page: carts.page,
        prevPage: carts.prevPage,
        nextPage: carts.nextPage,
        hasPrevPage: carts.hasPrevPage,
        hasNextPage: carts.hasNextPage,
      };

      return cartsProductsFlatPaginate;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(id) {
    try {
      const cartFind = await cartDao.getById(id);

      return cartFind;
    } catch (error) {
      throw error;
    }
  }

  async addCart() {
    try {
      const products = [];
      const cart = await cartDao.post(products);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async deleteAllProdsCart(id) {
    try {
      const cart = await cartDao.getById(id);

      cart.products = [];

      await cart.save();
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(idCart, idProduct, quantity) {
    try {
      let cart = await cartDao.getByIdPopulate(idCart);
      const product = await productDao.getById(idProduct);

      const existingProductIndex = cart.products.findIndex(
        (item) => item.product._id.toString() === idProduct
      );

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity++;
      } else {
        cart.products.push({ product: product, quantity: quantity || 1 });
      }

      await cartDao.cartUpdate(idCart, cart);

      return JSON.stringify(cart, null, 2);
    } catch (error) {
      throw error;
    }
  }

  async deleteProductInCart(idCart, idProduct) {
    try {
      const cart = await cartDao.getByIdPopulate(idCart);

      const productIndex = cart.products.findIndex(
        (product) => product.product._id.toString() === idProduct
      );

      if (productIndex === -1) {
        throw CustomError.createError({
          name: "error prod ID",
          message: "product not found in the cart",
          code: EErros.ID_NOT_FOUND,
        });
      } else {
        cart.products.splice(productIndex, 1);
        await cart.save();
      }
    } catch (error) {
      throw error;
    }
  }

  async updateCart(idCart, newProducts) {
    try {
      const cart = await cartDao.getByIdPopulate(idCart);
      cart.products = [];
      for (const product of newProducts) {
        const productData = await productDao.getById(product._id);

        cart.products.push({
          product: productData,
          quantity: product.quantity || 1,
        });
      }

      await cart.save();
    } catch (error) {
      throw error;
    }
  }

  async updateProdQuantityInCart(idCart, idProduct, quantity) {
    try {
      const cart = await cartDao.getByIdPopulate(idCart);

      const existingProductIndex = cart.products.findIndex(
        (item) => item.product._id.toString() === idProduct
      );

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity = quantity;
      } else {
        throw CustomError.createError({
          name: "error prod ID",
          message: "product not found in cart",
          code: EErros.ID_NOT_FOUND,
        });
      }

      await cart.save();
    } catch (error) {
      throw error;
    }
  }
}

export const cartServices = new CartServices();
