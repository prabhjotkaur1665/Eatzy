// import Order from "../models/Order.js";

// // PLACE ORDER
// export const placeOrder = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { items, total, address, paymentMethod } = req.body;

//     const order = await Order.create({
//       userId,
//       items,
//       total,
//       address,
//       paymentMethod
//     });

//     res.json({ success: true, order });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // GET USER ORDERS
// export const getUserOrders = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const orders = await Order.find({ userId }).sort({ createdAt: -1 });

//     res.json({ success: true, orders });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };















// import Order from "../models/Order.js";

// // PLACE ORDER
// export const placeOrder = async (req, res) => {
//   try {
//       console.log("BODY:", req.body);       // ✅ ADD
//     console.log("USER:", req.user); 
//     const order = await Order.create({
//   userId: req.user._id,
//   sellerId: req.body.sellerId, 
//   items: req.body.items,
//   total: req.body.total,
//   address: req.body.address,
//   paymentMethod: req.body.paymentMethod
// });

// console.log("SAVED IN DB:", order);

//     res.json({ success: true, order });
//   } catch (error) {
//     res.status(500).json({ success: false });
//   }
// };

// // GET USER ORDERS
// export const getUserOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.user._id })
//       .sort({ createdAt: -1 });

//     res.json({ success: true, orders });
//   } catch (error) {
//     res.status(500).json({ success: false });
//   }
// };

// export const getSellerOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ sellerId: req.seller._id })
//       .sort({ createdAt: -1 });

//     res.json({ success: true, orders });
//   } catch (error) {
//     res.status(500).json({ success: false });
//   }
// };

// export const updateOrderStatus = async (req, res) => {
//   try {
//     const order = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status: req.body.status },
//       { new: true }
//     );

//     res.json({ success: true, order });
//   } catch (error) {
//     res.status(500).json({ success: false });
//   }
// };
















import Order from "../models/Order.js";
import Menu from "../models/Menu.js";

export const placeOrder = async (req, res) => {
  try {
    const { items, total, address, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, msg: "No items" });
    }

    const itemsWithSeller = [];

    for (let item of items) {
      if (!item.productId) {
        return res.status(400).json({ success: false, msg: "Missing productId" });
      }

      const product = await Menu.findById(item.productId);

      if (!product) {
        return res.status(400).json({ success: false, msg: "Product not found" });
      }

      if (!product.sellerId) {
        return res.status(400).json({ success: false, msg: "Seller missing in product" });
      }

      itemsWithSeller.push({
        itemId: item.productId,
        quantity: item.quantity,
        sellerId: product.sellerId
      });
    }

// 🔥 Ensure all items belong to same seller
const sellerIds = itemsWithSeller.map(item => item.sellerId.toString());

const uniqueSellers = [...new Set(sellerIds)];

if (uniqueSellers.length > 1) {
  return res.status(400).json({
    success: false,
    msg: "Multiple sellers in cart not allowed"
  });
}

const sellerId = uniqueSellers[0];

    if (!sellerId) {
      return res.status(400).json({ success: false, msg: "Seller not found" });
    }

    const order = await Order.create({
      userId: req.user._id,
      sellerId,
      items: itemsWithSeller,
      total,
      address,
      paymentMethod
    });

    return res.json({ success: true, order });

  } catch (error) {
    console.log("ORDER ERROR:", error);
    return res.status(500).json({ success: false, msg: "Server Error" });
  }
};

// ✅ USER ORDERS
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
  .sort({ createdAt: -1 })
  .lean();

for (let order of orders) {
  for (let item of order.items) {
    const product = await Menu.findById(item.itemId);
    item.product = product; // 🔥 ADD FULL PRODUCT DATA
  }
}

    res.json({ success: true, orders });

  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// ✅ SELLER ORDERS
export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ sellerId: req.user._id })
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });

  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// ✅ UPDATE STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json({ success: true, order });

  } catch (error) {
    res.status(500).json({ success: false });
  }
};