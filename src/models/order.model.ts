import mongoose, { Schema, Document, Types } from "mongoose";

enum orderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface IOrder extends Document {
  userId: Types.ObjectId;
  totalAmount: number;
  orderDate: Date;
  status: orderStatus;
  addressId: Types.ObjectId;
}

const OrderSchema: Schema<IOrder> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, required: true, default: Date.now },
    status: { type: String, required: true, enum: Object.values(orderStatus), default: orderStatus.PENDING },
    addressId: { type: Schema.Types.ObjectId, ref: "Address", required: true },
  },
  {
    timestamps: true,
  }
);

export const orderModel = mongoose.model<IOrder>("Order", OrderSchema);
