// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URL); // ✅ FIXED

//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//     console.log(`✅ Database: ${conn.connection.name}`);
//   } catch (error) {
//     console.error("❌ MongoDB Error:", error.message);
//     process.exit(1);
//   }
// };

// export default connectDB;







import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;





// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config(); // ✅ ADD THIS

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);

//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error("❌ MongoDB Error:", error);
//     process.exit(1);
//   }
// };

// export default connectDB;