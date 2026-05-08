                                // correct for only seller 

// import jwt from "jsonwebtoken";
// import Seller from "../models/Seller.js";

// export const protect = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         msg: "No token"
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const seller = await Seller.findById(decoded.id).select("-password");

//     if (!seller) {
//       return res.status(401).json({
//         success: false,
//         msg: "Seller not found"
//       });
//     }

//     req.user = seller;
//     next();

//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       msg: "Invalid token"
//     });
//   }
// };










import jwt from "jsonwebtoken";
import Seller from "../models/Seller.js";
import User from "../models/User.js";

// 🔥 SELLER PROTECT
export const protectSeller = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, msg: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const seller = await Seller.findById(decoded.id).select("-password");

    if (!seller) {
      return res.status(401).json({ success: false, msg: "Seller not found" });
    }

    req.user = seller;
    next();

  } catch {
    res.status(401).json({ success: false, msg: "Invalid token" });
  }
};

// 🔥 USER PROTECT
export const protectUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, msg: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, msg: "User not found" });
    }

    req.user = user;
    next();

  } catch {
    res.status(401).json({ success: false, msg: "Invalid token" });
  }
};