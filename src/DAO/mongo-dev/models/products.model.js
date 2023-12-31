import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String },
  code: { type: String, required: true, unique: true },
  stock: { type: Number, required: true },
  status: { type: Boolean, required: true },
});

schema.plugin(mongoosePaginate);

export const productsModel = model("products", schema);
