import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const schema = new Schema({
  code: { type: String, required: true, unique: true },
  purchase_datetime: { type: Date, required: true },
  amount: { type: Number, required: true },
  purchase: { type: String, required: true },
});

schema.plugin(mongoosePaginate);

export const ticketModel = model("ticket", schema);
