import ProductsDao from "../DAO/mongo-dev/products.dao.js";

const productsDao = new ProductsDao();

class ProductsService {
  async getAllProducts(limit, page, sort) {
    try {
      // productos sin aplanar
      const products = await productsDao.get(limit, page);

      // docs de paginate (aplanado de los productos)
      let productsFlat = products.docs.map((prod) => {
        return {
          id: prod._id.toString(),
          title: prod.title,
          description: prod.description,
          price: prod.price,
          thumbnail: prod.thumbnail,
          code: prod.code,
          stock: prod.stock,
          status: prod.status,
        };
      });

      if (sort === "asc") {
        productsFlat.sort((a, b) => a.price - b.price);
      } else if (sort === "desc") {
        productsFlat.sort((a, b) => b.price - a.price);
      }

      // productos aplanados con datos de paginate (respuesta para el front)
      const productsFlatPaginate = {
        products: productsFlat,
        totalDocs: products.totalDocs,
        limit: products.limit,
        totalPages: products.totalPages,
        page: products.page,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
      };

      return productsFlatPaginate;
    } catch (error) {
      throw error;
    }
  }
}

export const productsServices = new ProductsService();
