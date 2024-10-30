import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICart extends Document {
  cartId: string;
  userId: Types.ObjectId;
  totalAmount: number;
}

const CartSchema: Schema<ICart> = new Schema(
  {
    cartId: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    totalAmount: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const cartModel = mongoose.model<ICart>("Cart", CartSchema);
