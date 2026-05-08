// import express from "express";
// import { placeOrder, getUserOrders } from "../controllers/orderController.js";
// import { protectUser } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/", protectUser, placeOrder);
// router.get("/", protectUser, getUserOrders);

// export default router;










// import express from "express";
// import { placeOrder, getUserOrders } from "../controllers/orderController.js";
// import { protectUser } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/", protectUser, placeOrder);
// router.get("/", protectUser, getUserOrders); 
// export default router;



// import express from "express";
// import { placeOrder, getUserOrders,updateOrderStatus, getSellerOrders } from "../controllers/orderController.js";
// import { protectUser, protectSeller } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/", protectUser, placeOrder);
// router.get("/", protectUser, getUserOrders); 
// router.get("/seller", protectSeller, getSellerOrders);
// router.put("/:id", protectSeller, updateOrderStatus);

// export default router;












// import express from "express";
// import {
//   placeOrder,
//   getUserOrders,
//   getSellerOrders,
//   updateOrderStatus
// } from "../controllers/orderController.js";

// import { protectUser, protectSeller,getUserOrders } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/", protectUser, placeOrder);
// router.get("/", protectUser, getUserOrders);
// router.get("/seller", protectSeller, getSellerOrders);
// router.put("/:id", protectSeller, updateOrderStatus);
// router.get("/user", authUser, getUserOrders);


// export default router;










import express from "express";

import {
  placeOrder,
  getUserOrders,
  getSellerOrders,
  updateOrderStatus
} from "../controllers/orderController.js";

import { protectUser, protectSeller } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ PLACE ORDER
router.post("/", protectUser, placeOrder);

// ✅ USER ORDERS
router.get("/user", protectUser, getUserOrders);

// ✅ SELLER ORDERS
router.get("/seller", protectSeller, getSellerOrders);

// ✅ UPDATE STATUS
router.put("/:id", protectSeller, updateOrderStatus);

router.put("/:id", protectSeller, updateOrderStatus);

export default router;