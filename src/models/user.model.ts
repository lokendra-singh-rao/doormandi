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
    fullname: { type: String, required: [true, "Fullname is required!"], trim: true },
    email: { type: String, required: [true, "Email is required!"], unique: true, trim: true },
    phone: { type: String, required: [true, "Phone number is required!"], unique: true, trim: true },
    hash: { type: String, required: [true, "Password is required!"] },
    role: { type: String, required: [true, "Role is required!"], enum: Object.values(UserRole), default: UserRole.ADMIN },
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    lastLogin: { type: Date },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose?.models?.User || mongoose.model<IUser>("User", UserSchema);

export const saveUser = async ({ user }: { user: IUser }) => {
  return await user.save();
};

export const createUser = async ({ fullname, email, phone, hash }: { fullname: string; email: string; phone: number; hash: string }): Promise<IUser> => {
  return await User.create({ fullname, email, phone, hash });
};

export const getUserById = async ({ id }: { id: string }): Promise<IUser | null> => {
  return await User.findById(id);
};

export const getUserByEmailOrPhone = async ({ emailOrPhone }: { emailOrPhone: string }): Promise<IUser | null> => {
  return await User.findOne({
    $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    isDeleted: false,
  });
};

export const getUserByEmail = async ({ email }: { email: string }): Promise<IUser | null> => {
  return await User.findOne({ email, isDeleted: false });
};

export const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find({ isDeleted: false });
};

export const updateUser = async ({ id, updateData }: { id: string; updateData: Partial<IUser> }): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteUser = async ({ id }: { id: string }): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

export default User;
