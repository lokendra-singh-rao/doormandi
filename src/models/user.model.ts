import mongoose, { Schema, Document } from "mongoose";

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
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    role: { type: String, required: true, enum: Object.values(UserRole) },
    emailVerified: { type: Boolean, required: true, default: false },
    phoneVerified: { type: Boolean, required: true, default: false },
    isDeleted: { type: Boolean, required: true, default: false },
    lastLogin: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export const user = mongoose.model<IUser>("User", UserSchema);
