import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null;

export default async function dbConnect() {
  if(cachedConnection) {
    console.log("Database already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {
      connectTimeoutMS:10000
    })

    cachedConnection = db.connection;

    console.log("Database connected successfully")

    return cachedConnection;

  } catch (error) {
    console.log("Databse connection failed:", error)

    process.exit(1);
  }
}