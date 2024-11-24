const { MONGODB_URI } = process.env;

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI as string);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null;

export default async function dbConnect() {
  if (cachedConnection) {
    return;
  }

  try {
    const { connection } = await mongoose.connect(MONGODB_URI as string);
    if (connection.readyState === 1) {
      cachedConnection = connection;
      console.log("Database connected successfully");
    }
  } catch (error) {
    console.log("Databse connection failed:", error);
    process.exit(1);
  }
}
