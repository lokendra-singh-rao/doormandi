import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOrderItem extends Document {
  orderItemId: string;
  orderId: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

const OrderItemSchema: Schema<IOrderItem> = new Schema(
  {
    orderItemId: { type: String, required: true, unique: true },
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const orderItemModel = mongoose.model<IOrderItem>("OrderItem", OrderItemSchema);
