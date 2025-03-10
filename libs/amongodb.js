import mongoose from "mongoose";

export const aconnectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.AUTH_MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
