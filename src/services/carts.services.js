import CartDao from "../DAO/mongo-dev/carts.dao.js";
import ProductsDao from "../DAO/mongo-dev/products.dao.js";
import TicketDao from "../DAO/mongo-dev/ticket.dao.js";
import CustomError from "../errors/custom-error.js";
import EErros from "../errors/enums.js";

const cartDao = new CartDao();
const productDao = new ProductsDao();
const ticketDao = new TicketDao();

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

  async purchase(idCart) {
    try {
      const cart = await cartDao.getById(idCart);
      const productsInCart = cart.products;
      const productsRequested = [];
      const productsStock = [];
      const outOfStock = [];
      const purchasedProducts = [];
      let totalPurchaseAmount = 0;

      if (productsInCart.length == 0) {
        throw CustomError.createError({
          name: "error no products",
          message: "there are no products in the cart",
          code: EErros.EMPTY_CART,
        });
      }
      for (const productEntry of productsInCart) {
        const productId = productEntry.product._id;
        const requestedQuantity = productEntry.quantity;
        productsRequested.push({
          id: productId,
          quantity: requestedQuantity,
        });
      }

      for (const product of productsRequested) {
        const productFind = await productDao.getById(product.id);

        productsStock.push({
          stock: productFind.stock,
          price: productFind.price,
          title: productFind.title,
          description: productFind.description,
          code: productFind.code,
          status: productFind.status,
          id: productFind.id,
          thumbnail: productFind.thumbnail,
        });
      }

      for (let i = 0; i < productsRequested.length; i++) {
        const requestedQuantity = productsRequested[i].quantity;
        const availableStock = productsStock[i].stock;

        if (requestedQuantity <= availableStock) {
          purchasedProducts.push(productsRequested[i]);
          productsStock[i].stock -= requestedQuantity;
          totalPurchaseAmount += requestedQuantity * productsStock[i].price;

          await productDao.putStock(productsStock[i].id, {
            stock: productsStock[i].stock,
          });
        } else {
          outOfStock.push({
            _id: productsRequested[i].id,
            quantity: productsRequested[i].quantity,
          });
        }
      }

      const ticket = {
        code: Math.floor(Math.random() * 99999999999),
        purchase_datetime: new Date(),
        amount: totalPurchaseAmount,
        purchase: JSON.stringify(purchasedProducts),
      };

      const newTicket = await ticketDao.post(ticket);
      await newTicket.save();

      if (outOfStock) {
        const updatedProductsInCart = outOfStock.map((product) => ({
          _id: product._id,
          quantity: product.quantity,
        }));
        cart.products = updatedProductsInCart;
        await cart.save();
      } else {
        cart.products = [];
        await cart.save();
      }

      return {
        purchasedProducts,
        outOfStock,
        ticket: newTicket,
      };
    } catch (error) {
      throw error;
    }
  }
}

export const cartServices = new CartServices();
