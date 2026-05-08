// import express from "express";
// import { signup, login, logout, getProfile } from "../controllers/sellerController.js";
// import { protect } from "../middleware/authMiddleware.js";
// import { upload } from "../middleware/uploadMiddleware.js"; 

// const router = express.Router();
// router.post("/signup", upload.single("profileImage"), signup);

// router.post("/login", login);
// router.post("/logout", logout);
// router.get("/profile", protect, getProfile);

// export default router;





import express from "express";
import {
  signup,
  login,
  logout,
  getProfile,
  getDashboardStats
} from "../controllers/sellerController.js";

// import { protect } from "../middleware/authMiddleware.js";
import { protectSeller } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ NO upload middleware
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
// router.get("/profile", protect, getProfile);
// router.get("/dashboard-stats", protect, getDashboardStats);
router.get("/profile", protectSeller, getProfile);
router.get("/dashboard-stats", protectSeller, getDashboardStats);

export default router;