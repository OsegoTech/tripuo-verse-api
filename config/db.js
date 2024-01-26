import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.MONGO_URI);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://OsegoTech:Mongo2000.@cluster0.dz97srz.mongodb.net/Mall-Hub?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
