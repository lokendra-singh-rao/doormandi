import mongoose, { Schema, Document, Types } from "mongoose";

enum AddressType {
  HOME = "Home",
  WORK = "Work",
  OTHER = "Other",
}
export interface IAddress extends Document {
  userId: Types.ObjectId;
  type: AddressType;
  hNo: string;
  street: string;
  cityId: Types.ObjectId;
  pincode: number;
  isDefault: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema: Schema<IAddress> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    type: { type: String, enum: Object.values(AddressType), required: true },
    hNo: { type: String },
    street: { type: String },
    cityId: { type: Schema.Types.ObjectId },
    pincode: { type: Number },
    isDefault: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const addressModel = mongoose.model<IAddress>("Address", AddressSchema);