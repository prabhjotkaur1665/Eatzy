// import express from "express";
// import { registerUser, loginUser } from "../controllers/userController.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// export default router;









//                                     correct

// import express from "express";
// import {
//   signup,
//   login,
//   logout,
//   getProfile
// } from "../controllers/userController.js";

// // import { protect } from "../middleware/authMiddleware.js";
// import { protectUser } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/logout", logout);
// // router.get("/profile", protect, getProfile);
// router.get("/profile", protectUser, getProfile);


// export default router;




                                    // correct 

// import express from "express";
// import {
//   signup,
//   login,
//   logout,
//   getProfile,
//   placeOrder,     // ✅ ADD
//   getUserOrders   // ✅ ADD
// } from "../controllers/userController.js";
// import { protectUser } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/logout", logout);
// router.get("/profile", protectUser, getProfile);

// // ✅ NEW ROUTES
// router.post("/orders", protectUser, placeOrder);     // POST order
// router.get("/orders", protectUser, getUserOrders);   // GET orders



// export default router;











import express from "express";
import {
  signup,
  login,
  logout,        // ✅ KEEP THIS (controller function)
  getProfile,
} from "../controllers/userController.js";
import { protectUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// ✅ FIXED: Use controller function (REMOVE duplicate route)
router.post("/logout", logout); 

router.get("/profile", protectUser, getProfile);

// ✅ NEW ROUTES
// router.post("/orders", protectUser, placeOrder);
// router.get("/orders", protectUser, getUserOrders);

export default router;