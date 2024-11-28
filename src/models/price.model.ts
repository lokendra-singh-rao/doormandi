import mongoose, { Schema, Document, Types } from "mongoose";

const PriceArraySchema = new Schema(
  {
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
  },
  { _id: true }
);

export interface IPrice extends Document {
  productId: Types.ObjectId;
  prices: {
    price: number;
    weight: number;
  }[];
  cityId: { type: string, required: true },
  maximumOrderQuantity: number;
}

const PriceSchema: Schema<IPrice> = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    prices: { type: [PriceArraySchema], required: true },
    cityId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const priceModel = mongoose.model<IPrice>("Price", PriceSchema);
