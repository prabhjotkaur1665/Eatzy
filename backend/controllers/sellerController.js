// import Seller from "../models/Seller.js";
// import bcrypt from "bcryptjs";
// import generateToken from "../utils/generateToken.js";

// // SIGNUP
// export const signup = async (req, res) => {
//   try {
//     const { restaurantName, ownerEmail, password, phone, address } = req.body;

//     // Validation
//     if (!restaurantName || !ownerEmail || !password || !phone) {
//       return res.status(400).json({
//         success: false,
//         msg: "Please fill all required fields"
//       });
//     }

//     // Check if restaurant or email already exists
//     const existing = await Seller.findOne({
//       $or: [{ ownerEmail }, { restaurantName }]
//     });

//     if (existing) {
//       return res.status(400).json({
//         success: false,
//         msg: "Restaurant name or email already exists"
//       });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 12);

//     let imageUrl = "";

//     // Handle image upload
//     if (req.file) {
//       try {
//         const ImageKit = (await import("imagekit")).default;
//         const imagekit = new ImageKit({
//           publicKey: process.env.IMAGEKIT_PUBLICKEY,
//           privateKey: process.env.IMAGEKIT_PRIVATEKEY,
//           urlEndpoint: process.env.IMAGEKIT_URL
//         });

//         const response = await imagekit.upload({
//           file: req.file.buffer,
//           fileName: `seller_${Date.now()}.jpg`,
//           folder: "/seller_profiles"
//         });

//         imageUrl = response.url;
//       } catch (imageError) {
//         console.error("Image upload failed:", imageError);
//         // Continue without image if upload fails
//       }
//     }

//     // Create seller
//     const seller = await Seller.create({
//       restaurantName,
//       ownerEmail,
//       phone,
//       address,
//       password: hashedPassword,
//       image: imageUrl
//     });

//     // Generate token and send response
//     generateToken(res, seller._id);

//     const { password: _, ...sellerResponse } = seller.toObject();
    
//     res.status(201).json({
//       success: true,
//       msg: "Seller created successfully",
//       seller: sellerResponse
//     });

//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({
//       success: false,
//       msg: "Server error during signup"
//     });
//   }
// };

// // LOGIN
// export const login = async (req, res) => {
//   try {
//     const { restaurantName, ownerEmail, password } = req.body;

//     if (!restaurantName || !ownerEmail || !password) {
//       return res.status(400).json({
//         success: false,
//         msg: "Please provide all fields"
//       });
//     }

//     // Find seller by restaurantName OR ownerEmail
//     const seller = await Seller.findOne({
//       $or: [{ restaurantName }, { ownerEmail }]
//     }).select("+password");

//     if (!seller || !(await bcrypt.compare(password, seller.password))) {
//       return res.status(401).json({
//         success: false,
//         msg: "Invalid credentials"
//       });
//     }

//     // Generate token
//     generateToken(res, seller._id);

//     const { password: _, ...sellerResponse } = seller.toObject();

//     res.json({
//       success: true,
//       msg: "Login successful",
//       seller: sellerResponse
//     });

//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({
//       success: false,
//       msg: "Server error during login"
//     });
//   }
// };

// // LOGOUT
// export const logout = (req, res) => {
//   res.cookie("token", "", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     maxAge: 1
//   });

//   res.json({
//     success: true,
//     msg: "Logged out successfully"
//   });
// };

// // GET PROFILE
// export const getProfile = async (req, res) => {
//   try {
//     const seller = await Seller.findById(req.user.id).select("-password");
    
//     if (!seller) {
//       return res.status(404).json({
//         success: false,
//         msg: "Seller not found"
//       });
//     }

//     res.json({
//       success: true,
//       seller
//     });
//   } catch (err) {
//     console.error("Profile error:", err);
//     res.status(500).json({
//       success: false,
//       msg: "Server error"
//     });
//   }
// };

// // sellerController.js mein ye function add karo:

// // 🔥 DASHBOARD STATS - Individual seller data
// export const getDashboardStats = async (req, res) => {
//   try {
//     const sellerId = req.user.id;

//     // 🔥 Mock data - Har seller ka individual (0 se start)
//     const stats = {
//       todayRevenue: 0,
//       monthlyRevenue: 0,
//       totalOrders: 0,
//       totalItems: 0,
//       pendingOrders: 0,
//       activeCustomers: 0,
//       todayOrders: 0
//     };

//     // 🔥 Future mein real database queries:
//     /*
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     stats.totalOrders = await Order.countDocuments({ seller: sellerId });
//     stats.todayOrders = await Order.countDocuments({ 
//       seller: sellerId, 
//       createdAt: { $gte: today } 
//     });
//     stats.pendingOrders = await Order.countDocuments({ 
//       seller: sellerId, 
//       status: 'pending' 
//     });
//     stats.totalItems = await MenuItem.countDocuments({ seller: sellerId });
//     */

//     res.json({
//       success: true,
//       stats
//     });

//   } catch (error) {
//     console.error("Dashboard stats error:", error);
//     res.status(500).json({
//       success: false,
//       msg: "Failed to fetch stats"
//     });
//   }
// };








import Seller from "../models/Seller.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import Order from "../models/Order.js";
import Menu from "../models/Menu.js";

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { restaurantName, ownerEmail, password, phone, address } = req.body;

    if (!restaurantName || !ownerEmail || !password || !phone) {
      return res.status(400).json({
        success: false,
        msg: "Please fill all required fields"
      });
    }

    
    const existing = await Seller.findOne({
      $or: [{ ownerEmail }, { restaurantName }]
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        msg: "Restaurant or email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const seller = await Seller.create({
      restaurantName,
      ownerEmail,
      password: hashedPassword,
      phone,
      address
    });
    

    generateToken(res, seller._id);

    const { password: _, ...sellerData } = seller.toObject();

    res.status(201).json({
      success: true,
      msg: "Signup successful",
      seller: sellerData
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      msg: "Server error"
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { ownerEmail, password } = req.body;

    if (!ownerEmail || !password) {
      return res.status(400).json({
        success: false,
        msg: "Please provide email & password"
      });
    }

    const seller = await Seller.findOne({ ownerEmail });

    if (!seller || !(await bcrypt.compare(password, seller.password))) {
      return res.status(401).json({
        success: false,
        msg: "Invalid credentials"
      });
    }

    generateToken(res, seller._id);

    const { password: _, ...sellerData } = seller.toObject();

    res.json({
      success: true,
      msg: "Login successful",
      seller: sellerData
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      msg: "Server error"
    });
  }
};

// LOGOUT
export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  });

  res.json({
    success: true,
    msg: "Logged out"
  });
};

// PROFILE
export const getProfile = async (req, res) => {
  try {
    const seller = await Seller.findById(req.user._id).select("-password");

    res.json({
      success: true,
      seller
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Server error"
    });
  }
};


export const getDashboardStats = async (req, res) => {
  try {
    const sellerId = req.user._id;

    const orders = await Order.find({ sellerId });

    const totalOrders = orders.length;

    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

    const pendingOrders = orders.filter(o => o.status === "processing").length;

    const deliveredOrders = orders.filter(o => o.status === "delivered").length;

    const cancelledOrders = orders.filter(o => o.status === "cancelled").length;

    const totalItems = await Menu.countDocuments({ sellerId });

    res.json({
      success: true,
      stats: {
        todayRevenue: totalRevenue,
        monthlyRevenue: totalRevenue,
        totalOrders,
        totalItems,
        pendingOrders,
        deliveredOrders,
        cancelledOrders
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};

export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ sellerId: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    for (let order of orders) {
      for (let item of order.items) {
        const product = await Menu.findById(item.itemId);

        if (product) {
          item.product = {
            name: product.name,
            image: product.image,
            price: product.price
          };
        } else {
          item.product = null;
        }
      }
    }

    res.json({ success: true, orders });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};












// // import Seller from "../models/Seller.js";
// // import bcrypt from "bcryptjs";
// // import generateToken from "../utils/generateToken.js";

// // // SIGNUP - ULTRA FAST VERSION
// // export const signup = async (req, res) => {
// //   console.log("🚀 Signup started...");
  
// //   try {
// //     const { restaurantName, ownerEmail, password, phone, address } = req.body;
// //     console.log("📝 Data received:", { restaurantName, ownerEmail, phone });

// //     // Fast validation
// //     if (!restaurantName?.trim() || !ownerEmail?.trim() || !password || !phone?.trim()) {
// //       return res.status(400).json({
// //         success: false,
// //         msg: "Please fill all required fields"
// //       });
// //     }

// //     // Check duplicates FAST
// //     console.log("🔍 Checking duplicates...");
// //     const existingSeller = await Seller.findOne({
// //       $or: [{ ownerEmail }, { restaurantName }]
// //     });
    
// //     if (existingSeller) {
// //       console.log("❌ Duplicate found:", existingSeller.restaurantName);
// //       return res.status(400).json({
// //         success: false,
// //         msg: "Restaurant name or email already exists"
// //       });
// //     }

// //     // Hash password FAST
// //     console.log("🔐 Hashing password...");
// //     const hashedPassword = await bcrypt.hash(password, 10); // Reduced from 12 to 10 for speed

// //     let imageUrl = "";
    
    

// //     // Create seller ULTRA FAST
// //     console.log("💾 Saving to MongoDB...");
// //     const seller = await Seller.create({
// //       restaurantName: restaurantName.trim(),
// //       ownerEmail: ownerEmail.trim(),
// //       phone: phone.trim(),
// //       address: address?.trim() || "",
// //       password: hashedPassword,
// //       image: imageUrl
// //     });

// //     console.log("✅ Seller created:", seller._id);

// //     // Generate token
// //     generateToken(res, seller._id);

// //     // Response
// //     const sellerResponse = seller.toObject();
// //     delete sellerResponse.password;

// //     console.log("🎉 Signup SUCCESS!");
// //     res.status(201).json({
// //       success: true,
// //       msg: "Account created successfully!",
// //       seller: sellerResponse
// //     });

// //   } catch (err) {
// //     console.error("💥 FULL ERROR:", err);
// //     res.status(500).json({
// //       success: false,
// //       msg: "Signup failed: " + err.message
// //     });
// //   }
// // };

// // // Rest of controllers remain same...
// // export const login = async (req, res) => {
// //   try {
// //     const { restaurantName, ownerEmail, password } = req.body;

// //     const seller = await Seller.findOne({
// //       $or: [{ restaurantName }, { ownerEmail }]
// //     });

// //     if (!seller || !(await bcrypt.compare(password, seller.password))) {
// //       return res.status(401).json({
// //         success: false,
// //         msg: "Invalid credentials"
// //       });
// //     }

// //     generateToken(res, seller._id);
// //     const { password: _, ...sellerResponse } = seller.toObject();

// //     res.json({
// //       success: true,
// //       msg: "Login successful!",
// //       seller: sellerResponse
// //     });

// //   } catch (err) {
// //     console.error("Login error:", err);
// //     res.status(500).json({ success: false, msg: "Login failed" });
// //   }
// // };

// // export const logout = (req, res) => {
// //   res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
// //   res.json({ success: true, msg: "Logged out" });
// // };

// // export const getProfile = async (req, res) => {
// //   try {
// //     const seller = await Seller.findById(req.user.id).select("-password");
// //     res.json({ success: true, seller });
// //   } catch (err) {
// //     res.status(500).json({ success: false, msg: "Profile fetch failed" });
// //   }
// // };









// import Seller from "../models/Seller.js";
// import bcrypt from "bcryptjs";
// import generateToken from "../utils/generateToken.js";

// export const signup = async (req, res) => {
//   console.log("🚀 SIGNUP STARTED");
//   console.log("📋 BODY:", req.body);
  
//   try {
//     const { restaurantName, ownerEmail, password, phone, address } = req.body;

//     // Duplicate check
//     const existing = await Seller.findOne({
//       $or: [{ ownerEmail }, { restaurantName }]
//     });
//     if (existing) {
//       console.log("❌ DUPLICATE:", existing);
//       return res.status(400).json({ success: false, msg: "Already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create seller
//     const seller = new Seller({
//       restaurantName,
//       ownerEmail,
//       phone,
//       address: address || "",
//       password: hashedPassword
//     });

//     await seller.save();
//     console.log("✅ SAVED TO MONGODB:", seller._id);

//     generateToken(res, seller._id);
    
//     res.status(201).json({
//       success: true,
//       seller: { 
//         id: seller._id, 
//         restaurantName, 
//         ownerEmail, 
//         phone 
//       }
//     });

//   } catch (error) {
//     console.error("💥 ERROR:", error);
//     res.status(500).json({ success: false, msg: error.message });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { restaurantName, ownerEmail, password } = req.body;
//     const seller = await Seller.findOne({ $or: [{ restaurantName }, { ownerEmail }] });
    
//     if (seller && await bcrypt.compare(password, seller.password)) {
//       generateToken(res, seller._id);
//       res.json({ success: true, seller });
//     } else {
//       res.status(401).json({ success: false, msg: "Invalid credentials" });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, msg: error.message });
//   }
// };

// export const logout = (req, res) => {
//   res.clearCookie("token");
//   res.json({ success: true });
// };

// export const getProfile = async (req, res) => {
//   const seller = await Seller.findById(req.user.id);
//   res.json({ success: true, seller });
// };