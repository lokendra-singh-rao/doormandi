import mongoose, { Schema, Document, Types } from "mongoose";

export interface IFavourite extends Document {
  id: string;
  userId: Types.ObjectId;
  productId: Types.ObjectId;
}

const FavouriteSchema: Schema<IFavourite> = new Schema(
  {
    id: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  },
  {
    timestamps: true,
  }
);

export const favouriteModel = mongoose.model<IFavourite>("Favourite", FavouriteSchema);
