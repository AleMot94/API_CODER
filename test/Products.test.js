import mongoose from "mongoose";
import chai from "chai";
import { productsModel } from "../src/DAO/mongo-dev/models/products.model.js";

const expect = chai.expect;

await mongoose.connect(
  "mongodb+srv://guillermofergnani:DBeXuiDCQMqLyMTa@51380.yhqtnxt.mongodb.net/pets"
);

describe("test de modelo PRODUCTS", () => {
  it("Obtiene todos los productos", async function () {
    const products = await productsModel.find();

    expect(products).to.be.an("array");
  });
});
