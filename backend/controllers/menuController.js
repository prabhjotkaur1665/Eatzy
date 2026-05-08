// import Menu from "../models/menu.js"; // ✅ capital M
// import imagekit from "../config/imageKit.js";

// // ✅ ADD ITEM
// export const addMenuItem = async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       category,
//       price,
//       calories,
//       prepTime,
//       isAvailable,
//       restaurantName,
//       ownerEmail,
//     } = req.body;

//     let image = "";       // ✅ match frontend
//     let imageFileId = "";

//     // 🔥 Upload to ImageKit
//     if (req.file) {
//       const result = await imagekit.upload({
//         file: req.file.buffer,
//         fileName: `${Date.now()}-${req.file.originalname}`,
//       });

//       image = result.url;          // ✅ IMPORTANT
//       imageFileId = result.fileId;
//     }

//     const newItem = new Menu({
//       name,
//       description,
//       category,
//       price,
//       calories,
//       prepTime,
//       isAvailable,
//       restaurantName,
//       ownerEmail,
//       image,          // ✅ correct field
//       imageFileId,
//     });

//     await newItem.save();

//     res.status(200).json({
//       success: true,
//       message: "Item added successfully",
//       item: newItem,
//     });

//   } catch (error) {
//     console.error("Add menu error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// // ✅ GET ALL ITEMS
// export const getAllMenuItems = async (req, res) => {
//   try {
//     const items = await Menu.find().sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       items,
//     });

//   } catch (error) {
//     console.error("Fetch menu error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };






// import Menu from "../models/menu.js";
// import imagekit from "../config/imageKit.js";

// // ✅ ADD ITEM
// export const addMenuItem = async (req, res) => {
//   try {
//     console.log("BODY:", req.body);
//     console.log("FILE:", req.file);

//     const {
//       name,
//       description,
//       category,
//       price,
//       calories,
//       prepTime,
//       isAvailable,
//       restaurantName,
//       ownerEmail,
//     } = req.body;

//     // 🔥 Basic validation
//     if (!name || !price || !restaurantName || !ownerEmail) {
//       return res.status(400).json({
//         success: false,
//         message: "Required fields missing",
//       });
//     }

//     let image = "";
//     let imageFileId = "";

//     // 🔥 Upload to ImageKit (SAFE)
//     if (req.file) {
//       try {
//         const result = await imagekit.upload({
//           file: req.file.buffer,
//           fileName: `${Date.now()}-${req.file.originalname}`,
//         });

//         image = result.url;
//         imageFileId = result.fileId;

//       } catch (uploadError) {
//         console.error("Image upload error:", uploadError);
//         return res.status(500).json({
//           success: false,
//           message: "Image upload failed",
//         });
//       }
//     }

//     // 🔥 Create new item
//     const newItem = new Menu({
//       name,
//       description,
//       category,
//       price: Number(price), // ✅ ensure number
//       calories: calories ? Number(calories) : 0,
//       prepTime: prepTime ? Number(prepTime) : 0,
//       isAvailable: isAvailable === "true" || isAvailable === true,
//       restaurantName,
//       ownerEmail,
//       image,
//       imageFileId,
//     });

//     // 🔥 Save to DB
//     const savedItem = await newItem.save();

//     console.log("Saved Item:", savedItem);

//     res.status(201).json({
//       success: true,
//       message: "Item added successfully",
//       item: savedItem,
//     });

//   } catch (error) {
//     console.error("Add menu error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message || "Server error",
//     });
//   }
// };


// // ✅ GET ALL ITEMS
// export const getAllMenuItems = async (req, res) => {
//   try {
//     const items = await Menu.find().sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       items: items || [],
//     });

//   } catch (error) {
//     console.error("Fetch menu error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

















// import Menu from "../models/menu.js";
// import imagekit from "../config/imageKit.js";

// // ✅ ADD ITEM
// export const addMenuItem = async (req, res) => {
//   try {
//     console.log("REQ START");
//     console.log("BODY:", req.body);
//     console.log("FILE:", req.file);

//     const {
//       name,
//       description,
//       category,
//       price,
//       calories,
//       prepTime,
//       isAvailable,
//       restaurantName,
//       ownerEmail,
//     } = req.body;

//     // ✅ Validation
//     if (!name || !price || !restaurantName || !ownerEmail) {
//       return res.status(400).json({
//         success: false,
//         message: "Required fields missing",
//       });
//     }

//     let image = "";
//     let imageFileId = "";

//     // ✅ Image upload (SAFE + fast)
//     if (req.file) {
//       try {
//         const result = await imagekit.upload({
//           file: req.file.buffer.toString("base64"), // 🔥 important fix
//           fileName: `${Date.now()}-${req.file.originalname}`,
//         });

//         image = result.url;
//         imageFileId = result.fileId;

//         console.log("IMAGE UPLOADED:", image);
//       } catch (err) {
//         console.error("Image upload error:", err);
//         return res.status(500).json({
//           success: false,
//           message: "Image upload failed",
//         });
//       }
//     }

//     // ✅ Create item
//     const newItem = new Menu({
//       name: name.trim(),
//       description: description || "",
//       category: category || "General",
//       price: Number(price),
//       calories: calories ? Number(calories) : 0,
//       prepTime: prepTime ? Number(prepTime) : 0,
//       isAvailable: isAvailable === "true" || isAvailable === true,
//       restaurantName: restaurantName.trim(),
//       ownerEmail: ownerEmail.trim(),
//       image,
//       imageFileId,
//     });

//     // ✅ Save
//     const savedItem = await newItem.save();

//     console.log("✅ SAVED IN DB:", savedItem._id);

//     return res.status(201).json({
//       success: true,
//       message: "Item added successfully",
//       item: savedItem,
//     });

//   } catch (error) {
//     console.error("❌ Add menu error:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Server error",
//     });
//   }
// };


// // ✅ GET ALL ITEMS
// export const getAllMenuItems = async (req, res) => {
//   try {
//     console.log("FETCHING MENU...");

//     const items = await Menu.find().sort({ createdAt: -1 });

//     console.log("ITEMS FOUND:", items.length);

//     return res.status(200).json({
//       success: true,
//       items,
//     });

//   } catch (error) {
//     console.error("❌ Fetch menu error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };





                                    // correct

// import imagekit from "../config/imageKit.js";

// // =======================
// // ✅ ADD MENU ITEM
// // =======================
// export const addMenuItem = async (req, res) => {
//   try {
//     console.log("🚀 ADD MENU API HIT");

//     const {
//       name,
//       description,
//       category,
//       price,
//       calories,
//       prepTime,
//       isAvailable,
//       restaurantName,
//       ownerEmail,
//     } = req.body;

//     // ✅ VALIDATION
//     if (!name || !price || !restaurantName || !ownerEmail) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, Price, Restaurant & Email are required",
//       });
//     }

//     let image = "";
//     let imageFileId = "";

//     // =======================
//     // ✅ IMAGE UPLOAD
//     // =======================
//     if (req.file) {
//       try {
//         const result = await imagekit.upload({
//           file: req.file.buffer.toString("base64"), // ✅ correct
//           fileName: `${Date.now()}-${req.file.originalname}`,
//         });

//         image = result.url;          // ✅ IMPORTANT
//         imageFileId = result.fileId;

//         console.log("✅ Image uploaded:", image);
//       } catch (err) {
//         console.error("❌ Image upload failed:", err.message);

//         return res.status(500).json({
//           success: false,
//           message: "Image upload failed",
//         });
//       }
//     }

//     // =======================
//     // ✅ CREATE ITEM
//     // =======================
//     const newItem = new Menu({
//       name: name.trim(),
//       description: description?.trim() || "",
//       category: category || "General",

//       price: Number(price),
//       calories: calories ? Number(calories) : 0,
//       prepTime: prepTime ? Number(prepTime) : 0,

//       isAvailable: isAvailable === "true" || isAvailable === true,

//       restaurantName: restaurantName.trim(),
//       ownerEmail: ownerEmail.trim(),

//       image,          // ✅ MUST BE STRING
//       imageFileId,
//     });

//     // =======================
//     // ✅ SAVE TO DB
//     // =======================
//     const savedItem = await newItem.save();

//     console.log("✅ Saved in DB:", savedItem._id);

//     return res.status(201).json({
//       success: true,
//       message: "Item added successfully",
//       item: savedItem,
//     });

//   } catch (error) {
//     console.error("❌ Add menu error:", error);

//     return res.status(500).json({
//       success: false,
//       message: error.message || "Server error",
//     });
//   }
// };


// // =======================
// // ✅ GET ALL MENU ITEMS
// // =======================
// export const getAllMenuItems = async (req, res) => {
//   try {
//     console.log("📦 Fetching menu items...");

//     const items = await Menu.find().sort({ createdAt: -1 });

//     console.log(`✅ Found ${items.length} items`);

//     return res.status(200).json({
//       success: true,
//       items, // ✅ IMPORTANT (frontend uses this)
//     });

//   } catch (error) {
//     console.error("❌ Fetch menu error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch menu",
//     });
//   }
// };










import Menu from "../models/Menu.js";
import imagekit from "../config/imageKit.js";

// ADD MENU ITEM
export const addMenuItem = async (req, res) => {
  try {
    console.log("🚀 ADD MENU API HIT");

    const {
      name,
      description,
      category,
      price,
      calories,
      prepTime,
      isAvailable,
      restaurantName,
      ownerEmail,
    } = req.body;

    if (!name || !price || !restaurantName || !ownerEmail) {
      return res.status(400).json({
        success: false,
        message: "Name, Price, Restaurant & Email are required",
      });
    }

    let image = "";
    let imageFileId = "";

    // if (req.file) {
    //   const result = await imagekit.upload({
    //    file: req.file.buffer,
    //     fileName: `${Date.now()}-${req.file.originalname}`,
    //   });

    //   image = result.url;
    //   imageFileId = result.fileId;
    // }

if (req.file) {
  console.log("FILE RECEIVED:", req.file.originalname);

  const result = await imagekit.upload({
    file: req.file.buffer, // ✅ IMPORTANT FIX
    fileName: `${Date.now()}-${req.file.originalname}`,
    folder: "/food-app-menu",
  });

  console.log("IMAGEKIT RESULT:", result);

  image = result.url;
  imageFileId = result.fileId;
}

    
    const newItem = new Menu({
      name: name.trim(),
      description: description?.trim() || "",
      category: category || "General",
      price: Number(price),
      calories: calories ? Number(calories) : 0,
      prepTime: prepTime ? Number(prepTime) : 0,
      isAvailable: isAvailable === "true" || isAvailable === true,
      restaurantName: restaurantName.trim(),
      ownerEmail: ownerEmail.trim(),
      sellerId: req.user._id,
      image,
      imageFileId,
    });

    const savedItem = await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Item added successfully",
      item: savedItem,
    });

  } catch (error) {
    console.error("❌ Add menu error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// GET ALL MENU ITEMS
export const getAllMenuItems = async (req, res) => {
  try {
    const items = await Menu.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      items,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu",
    });
  }
};