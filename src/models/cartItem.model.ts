import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICartItem extends Document {
  cartItemId: string;
  cartId: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
}

const CartItemSchema: Schema<ICartItem> = new Schema(
  {
    cartItemId: { type: String, required: true, unique: true },
    cartId: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, default: 1 },
  },
  {
    timestamps: true,
  }
);

export const cartItemModel = mongoose.model<ICartItem>("CartItem", CartItemSchema);
