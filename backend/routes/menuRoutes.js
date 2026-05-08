// import express from "express";
// import { addMenuItem, getAllMenuItems } from "../controllers/menuController.js";import { upload } from "../middleware/upload.js";

// const router = express.Router();

// // 🔥 image field name MUST match frontend (image)
// router.post("/add", upload.single("image"), addMenuItem);

// router.get("/all", getAllMenuItems);

// export default router;




import express from "express";
import { addMenuItem, getAllMenuItems } from "../controllers/menuController.js";
import { upload } from "../middleware/upload.js";
import { protectSeller } from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/add", protectSeller,upload.single("image"), addMenuItem);
router.get("/all", getAllMenuItems);

export default router;