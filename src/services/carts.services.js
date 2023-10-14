import CartDao from "../DAO/mongo-dev/carts.dao.js";

const cartDao = new CartDao();

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
}

export const cartServices = new CartServices();
