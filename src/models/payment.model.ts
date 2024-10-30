import mongoose, { Schema, Document, Types } from "mongoose";

enum PaymentStatus {
  PENDING = "Pending",
  COMPLETED = "Completed",
  FAILED = "Failed",
}

export interface IPayment extends Document {
  paymentId: string;
  orderId: Types.ObjectId;
  userId: Types.ObjectId;
  method: string;
  status: PaymentStatus;
  amount: number;
  timestamp: Date;
}

const PaymentSchema: Schema<IPayment> = new Schema(
  {
    paymentId: { type: String, required: true, unique: true },
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    method: { type: String, required: true },
    status: { type: String, enum: Object.values(PaymentStatus), required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const paymentModel = mongoose.model<IPayment>("Payment", PaymentSchema);
