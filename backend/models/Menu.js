import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    category: String,

    price: Number,
    calories: Number,
    prepTime: Number,
    isAvailable: Boolean,

    restaurantName: String,
    ownerEmail: String,

    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true
    },

    image: {
      type: String,
      default: "",
    },

    imageFileId: String,
  },
  { timestamps: true }
);

// ✅ FIX: prevent overwrite error
const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema);

export default Menu;