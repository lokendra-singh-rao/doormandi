import mongoose, { Schema, Document, Model } from "mongoose";

enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IUser extends Document {
  fullname: string;
  email: string;
  phone: string;
  hash: string;
  role: UserRole;
  emailVerified: boolean;
  phoneVerified: boolean;
  isDeleted: boolean;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    fullname: { type: String, required: [true, "Fullname is required!"] },
    email: { type: String, required: [true, "Email is required!"] },
    phone: { type: String, required: [true, "Phone number is required!"] },
    hash: { type: String, required: [true, "Password is required!"] },
    role: { type: String, required: [true, "Role is required!"], enum: Object.values(UserRole) },
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    lastLogin: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser> = mongoose?.models?.User || mongoose.model<IUser>("User", UserSchema);
