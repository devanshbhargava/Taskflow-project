import mongoose from "mongoose";

const connectdb = async () => {
  try {
    console.log("Connecting to:", process.env.MONGO_URL); // debug

    await mongoose.connect(process.env.MONGO_URL);

    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ database connection failed", error.message);
  }
};

export default connectdb;
