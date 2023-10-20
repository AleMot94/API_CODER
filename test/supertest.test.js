import chai from "chai";
import supertest from "supertest";
//import fs from "fs";
const expect = chai.expect;
const requester = supertest("http://localhost:8000/");

describe("Testing API CODER", () => {
  describe("endpoint api/products", () => {
    it("endpoint GET api/products debe todos los productos", async () => {
      const response = await requester.get("api/products");
      const { status, ok, _body } = response;
      //console.log(status, ok, _body);

      expect(status).to.equal(200);
    });

    /* it("endpoint POST api/products debe registrar un nuevo producto", async () => {
      const productMock = {
        title: "producto MOCK",
        description: "la descripcion del producto mock",
        price: 2500,
        thumbnail: "http://localhost:8000/eva01.jpg",
        code: "gfd654",
        stock: 25,
        status: true,
      };

      //const thumbnailPath = "eva01.jpg";
      //const thumbnail = fs.readFileSync(thumbnailPath);

      //console.log(thumbnail);

      const response = await requester.post("api/products").send(productMock);
      const { status, ok, _body } = response;
      console.log(status, ok, _body);

      expect(_body.payload).to.have.property("_id");
    }); */
  });
});
