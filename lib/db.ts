import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null;

export async function connectToMongoDB() {
  if (cachedConnection) {
    console.log("using cached MONGODB Connection");
    return cachedConnection;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    cachedConnection = conn.connection;

    console.log("new connection to MongoDB");
    return cachedConnection;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
