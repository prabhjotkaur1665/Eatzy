// const sellerSchema = new mongoose.Schema({
//   restaurantName: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   ownerEmail: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   phone: String,          // ✅ ADD THIS
//   address: String,        // ✅ ADD THIS
//   password: {
//     type: String,
//     required: true
//   },
//   image: String
// }, { timestamps: true });








// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const sellerSchema = new mongoose.Schema({
//   restaurantName: {
//     type: String,
//     required: [true, "Restaurant name is required"],
//     unique: true,
//     trim: true
//   },
//   ownerEmail: {
//     type: String,
//     required: [true, "Email is required"],
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   phone: {
//     type: String,
//     required: [true, "Phone number is required"],
//     trim: true
//   },
//   address: {
//     type: String,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: [true, "Password is required"],
//     minlength: 6
//   },
//   image: {
//     type: String,
//     default: ""
//   }
// }, { 
//   timestamps: true 
// });

// const Seller = mongoose.model("Seller", sellerSchema);
// export default Seller;





// import mongoose from "mongoose";

// const sellerSchema = new mongoose.Schema({
//   restaurantName: { type: String, required: true, unique: true },
//   ownerEmail: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   address: { type: String },
//   password: { type: String, required: true },
//   image: { type: String, default: "" }
// }, { timestamps: true });

// export default mongoose.model("Seller", sellerSchema);









import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true, unique: true },
  ownerEmail: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String },
  password: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Seller", sellerSchema);