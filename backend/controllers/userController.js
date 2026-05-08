// import bcrypt from "bcryptjs";
// import User from "../models/User.js";

// // ✅ REGISTER CONTROLLER
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({
//       msg: "User registered successfully",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });

//   } catch (error) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// // ✅ LOGIN CONTROLLER
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     res.status(200).json({
//       msg: "Login successful",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });

//   } catch (error) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };




















import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Please fill all fields"
      });
    }

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        success: false,
        msg: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    generateToken(res, user._id);

    const { password: _, ...userData } = user.toObject();

    res.status(201).json({
      success: true,
      msg: "Signup successful",
      user: userData
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server error"
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Please provide email & password"
      });
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        msg: "Invalid credentials"
      });
    }

    generateToken(res, user._id);

    const { password: _, ...userData } = user.toObject();

    res.json({
      success: true,
      msg: "Login successful",
      user: userData
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server error"
    });
  }
};

// LOGOUT
// ✅ ADD THIS TO userController.js
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.json({
    success: true,
    msg: "Logged out successfully",
  });
};

// PROFILE
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    res.json({
      success: true,
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server error"
    });
  }
};

// ✅ NEW: Place Order Controller
// export const placeOrder = async (req, res) => {
//   try {
//     const userId = req.user.id;  
//     const { items, total, address, paymentMethod } = req.body;

//     console.log("📦 Order received:", { userId, items, total, address });

//     // Create order (use your Order model)
//     const order = {
//       userId,
//       items: items.map(item => ({
//         itemId: item.itemId,
//         quantity: item.quantity,
//         price: 0  // Fetch from menu later
//       })),
//       total,
//       address,
//       paymentMethod,
//       status: 'processing',
//       createdAt: new Date()
//     };

//     // Save to database (replace with your model)
//     // const savedOrder = await Order.create(order);

//     // Mock response for now
//     const mockOrderId = `ORD${Date.now()}`;
    
//     res.json({
//       success: true,
//       orderId: mockOrderId,
//       order: { ...order, _id: mockOrderId }
//     });

//   } catch (error) {
//     console.error("Order error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// ✅ NEW: Get User Orders
// export const getUserOrders = async (req, res) => {
//   try {
//     const userId = req.user.id;
    
//     // Fetch orders from DB
//     // const userOrders = await Order.find({ userId }).sort({ createdAt: -1 });
    
//     // Mock orders
//     const mockOrders = [
//       {
//         _id: `ORD${Date.now()}`,
//         items: [{ itemId: "mock1", quantity: 2 }],
//         total: 250,
//         address: "Sample Address",
//         status: "processing",
//         createdAt: new Date()
//       }
//     ];
    
//     res.json({ success: true, orders: mockOrders });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };