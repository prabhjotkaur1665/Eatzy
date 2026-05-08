                      // correct 

// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   },
//   items: [
//     {
//       itemId: String,
//       quantity: Number
//     }
//   ],
//   total: Number,
//   address: String,
//   paymentMethod: String,
//   status: {
//     type: String,
//     default: "processing"
//   }
  
// }, { timestamps: true });

// export default mongoose.model("Order", orderSchema);










// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   },
//   sellerId: {  
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Seller"
//   },
// items: [
//   {
//     itemId: String,
//     quantity: Number,
//     sellerId: String   // ✅ ADD THIS
//   }
// ],
//   total: Number,
//   address: String,
//   paymentMethod: String,
//   status: {
//     type: String,
//     default: "processing"
//   }
// }, { timestamps: true });


// export default mongoose.model("Order", orderSchema);











import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller"
  },
 items: [
  {
    itemId: String,
    quantity: Number,
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller"
    }
  }
],
  total: Number,
address: {
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  country: String
},
  paymentMethod: String,
  status: {
    type: String,
    default: "processing"
  }
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;