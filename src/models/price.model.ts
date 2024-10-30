import mongoose, { Schema, Document, Types } from "mongoose";

const PriceArraySchema = new Schema(
  {
    price: { type: Number, required: true },
    weight: { type: Number, required: true },
  },
  { _id: true }
);

export interface IPrice extends Document {
  productId: Types.ObjectId;
  prices: {
    price: number;
    weight: number;
  }[];
}

const PriceSchema: Schema<IPrice> = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    prices: { type: [PriceArraySchema], required: true },
  },
  {
    timestamps: true,
  }
);

export const priceModel = mongoose.model<IPrice>("Price", PriceSchema);
