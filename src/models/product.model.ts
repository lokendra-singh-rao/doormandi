import mongoose, { Schema, Document, Types } from "mongoose";

enum ProductType {
  VEGITABLE = "Vegitable",
  FRUIT = "Fruit",
}

enum VegetableSubCategory {
  LEAFY = "Leafy",
  ROOT = "Root",
  TUBER = "Tuber",
}

enum FruitSubCategory {
  EXOTIC = "Exotic",
  SEASONAL = "Seasonal",
  CITRUS = "Citrus",
  BERRY = "Berry",
}

export interface IProduct extends Document {
  title: string;
  type: ProductType;
  subType: VegetableSubCategory | FruitSubCategory | null;
  priceId: Types.ObjectId;
  inStock: boolean;
  image: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String },
    type: { type: String, enum: Object.values(ProductType), required: true },
    subType: { type: String, default: null },
    priceId: { type: Schema.Types.ObjectId, required: true, ref: "Price" },
    inStock: { type: Boolean, default: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const productModel = mongoose.model<IProduct>("Product", ProductSchema);
