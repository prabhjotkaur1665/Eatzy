// import React, { createContext, useState } from "react";

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {

//   const [cartItems, setCartItems] = useState({});

//   // ➕ ADD TO CART
//   const addToCart = (itemId) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: (prev[itemId] || 0) + 1,
//     }));
//   };

//   // ➖ REMOVE FROM CART
//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => {
//       const updated = { ...prev };

//       if (updated[itemId] > 1) {
//         updated[itemId] -= 1;
//       } else {
//         delete updated[itemId];
//       }

//       return updated;
//     });
//   };

//   // 🧮 TOTAL ITEMS (for navbar badge)
//   const getTotalItems = () => {
//     return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
//   };

//   const contextValue = {
//     cartItems,
//     addToCart,
//     removeFromCart,
//     getTotalItems,
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;







// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// // ✅ SINGLE StoreContext - NO CIRCULAR IMPORT, NO DUPLICATES
// export const StoreContext = createContext(null);

// const StoreContextProvider = ({ children }) => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [cartItems, setCartItems] = useState({});
//   const [orders, setOrders] = useState([]);
//   const [toast, setToast] = useState({ message: "", type: "", show: false });
//   const [loading, setLoading] = useState(true);

//   // 🔥 TOTAL CART ITEMS COUNT
//   const getTotalItems = () => {
//     return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
//   };

//   // 🔥 FETCH MENU FROM BACKEND
//   const fetchMenuItems = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:5000/api/menu/all", {
//         withCredentials: true
//       });
//       setMenuItems(response.data.items || []);
//     } catch (error) {
//       console.error("Menu fetch error:", error);
//       setToast({
//         message: "Failed to load menu",
//         type: "error",
//         show: true
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔥 ADD TO CART
//   const addToCart = (itemId) => {
//     const item = menuItems.find(item => item._id === itemId);
//     if (!item) return;

//     setCartItems(prev => ({
//       ...prev,
//       [itemId]: (prev[itemId] || 0) + 1
//     }));

//     setToast({
//       message: `${item.name} added to cart`,
//       type: "success",
//       show: true
//     });
//   };

//   // 🔥 REMOVE FROM CART
//   const removeFromCart = (itemId) => {
//     const item = menuItems.find(item => item._id === itemId);
//     if (!item) return;

//     setCartItems(prev => {
//       if (prev[itemId] <= 1) {
//         const updated = { ...prev };
//         delete updated[itemId];
//         return updated;
//       }
//       return { ...prev, [itemId]: prev[itemId] - 1 };
//     });

//     setToast({
//       message: `${item.name} removed`,
//       type: "remove",
//       show: true
//     });
//   };

//   // 🔥 CLEAR CART
//   const clearCart = () => {
//     setCartItems({});
//     setToast({ message: "Cart cleared", type: "info", show: true });
//   };

//   // 🔥 PLACE ORDER
//   const placeOrder = async (address, paymentMethod) => {
//     try {
//       const orderData = {
//         items: Object.keys(cartItems).map(id => ({
//           itemId: id,
//           quantity: cartItems[id]
//         })),
//         total: getTotalAmount(),
//         address,
//         paymentMethod
//       };

//       const response = await axios.post(
//         "http://localhost:5000/api/users/orders",
//         orderData,
//         { withCredentials: true }
//       );

//       if (response.data.success) {
//         clearCart();
//         setOrders(prev => [response.data.order, ...prev]);
//         return { success: true, orderId: response.data.order._id };
//       }
//     } catch (error) {
//       setToast({
//         message: error.response?.data?.msg || "Order failed",
//         type: "error",
//         show: true
//       });
//       return { success: false };
//     }
//   };

//   // 🔥 GET TOTAL AMOUNT
//   const getTotalAmount = () => {
//     return menuItems.reduce((total, item) => {
//       if (cartItems[item._id]) {
//         total += item.price * cartItems[item._id];
//       }
//       return total;
//     }, 0) + 5; // + delivery fee
//   };

//   // 🔥 FETCH USER ORDERS
//   const fetchUserOrders = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/users/orders", {
//         withCredentials: true
//       });
//       setOrders(response.data.orders || []);
//     } catch (error) {
//       console.error("Orders fetch error:", error);
//     }
//   };

//   // 🔥 TOAST AUTO HIDE
//   useEffect(() => {
//     if (toast.show) {
//       const timer = setTimeout(() => {
//         setToast(prev => ({ ...prev, show: false }));
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [toast]);

//   // 🔥 INITIAL LOAD
//   useEffect(() => {
//     fetchMenuItems();
//     fetchUserOrders();
//   }, []);

//   const contextValue = {
//     menuItems,
//     cartItems,
//     orders,
//     loading,
//     getTotalItems,
//     getTotalAmount,
//     addToCart,
//     removeFromCart,
//     clearCart,
//     placeOrder,
//     fetchUserOrders,
//     toast,
//     setToast
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {children}
//       {toast.show && (
//         <Toast message={toast.message} type={toast.type} />
//       )}
//     </StoreContext.Provider>
//   );
// };

// // 🔥 TOAST COMPONENT
// const Toast = ({ message, type }) => (
//   <div className={`fixed top-20 right-4 z-50 p-4 rounded-xl shadow-2xl animate-slide-in transform transition-all ${
//     type === 'success' ? 'bg-emerald-500 text-white' :
//     type === 'error' ? 'bg-red-500 text-white' :
//     type === 'remove' ? 'bg-orange-500 text-white' :
//     'bg-blue-500 text-white'
//   }`}>
//     {message}
//   </div>
// );

// export { StoreContextProvider };  // ✅ NAMED EXPORT













// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// // ✅ SINGLE StoreContext - NO CIRCULAR IMPORT, NO DUPLICATES
// export const StoreContext = createContext(null);

// const StoreContextProvider = ({ children }) => {
//   // 🔥 ✅ USER STATE ADDED
//   const [user, setUser] = useState(null);
  
//   const [menuItems, setMenuItems] = useState([]);
//   const [cartItems, setCartItems] = useState({});
//   const [orders, setOrders] = useState([]);
//   const [toast, setToast] = useState({ message: "", type: "", show: false });
//   const [loading, setLoading] = useState(true);

//   // 🔥 TOTAL CART ITEMS COUNT
//   const getTotalItems = () => {
//     return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
//   };

//   // 🔥 ✅ CHECK USER AUTH ON LOAD
//   const checkAuth = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/users/profile", {
//         withCredentials: true
//       });
//       if (response.data.success) {
//         setUser(response.data.user);
//       }
//     } catch (error) {
//       console.log("No user logged in");
//       setUser(null);
//     }
//   };

//   // 🔥 FETCH MENU FROM BACKEND
// //   const fetchMenuItems = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await axios.get("http://localhost:5000/api/menu/all", {
// //         withCredentials: true
// //       });
// //       setMenuItems(response.data.items || []);
// //     } catch (error) {
// //       console.error("Menu fetch error:", error);
// //       setToast({
// //         message: "Failed to load menu",
// //         type: "error",
// //         show: true
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };




// const fetchMenuItems = async () => {
//   try {
//     setLoading(true);

//     const response = await axios.get("http://localhost:5000/api/menu/all");

//     console.log("MENU DATA:", response.data); // ✅ ADD THIS

//     setMenuItems(response.data.items || []);
//   } catch (error) {
//     console.error("Menu fetch error:", error);
//   } finally {
//     setLoading(false);
//   }
// };




//   // 🔥 ADD TO CART
//   const addToCart = (itemId) => {
//     const item = menuItems.find(item => item._id === itemId);
//     if (!item) return;

//     setCartItems(prev => ({
//       ...prev,
//       [itemId]: (prev[itemId] || 0) + 1
//     }));

//     setToast({
//       message: `${item.name} added to cart`,
//       type: "success",
//       show: true
//     });
//   };

//   // 🔥 REMOVE FROM CART
//   const removeFromCart = (itemId) => {
//     const item = menuItems.find(item => item._id === itemId);
//     if (!item) return;

//     setCartItems(prev => {
//       if (prev[itemId] <= 1) {
//         const updated = { ...prev };
//         delete updated[itemId];
//         return updated;
//       }
//       return { ...prev, [itemId]: prev[itemId] - 1 };
//     });

//     setToast({
//       message: `${item.name} removed`,
//       type: "remove",
//       show: true
//     });
//   };

//   // 🔥 CLEAR CART
//   const clearCart = () => {
//     setCartItems({});
//     setToast({ message: "Cart cleared", type: "info", show: true });
//   };

//   // 🔥 PLACE ORDER
//   const placeOrder = async (orderData) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:5000/api/orders",
//       {
//         items: Object.keys(orderData.items).map(id => ({
//           product: id,
//           quantity: orderData.items[id]
//         })),
//         sellerId: selectedSellerId, 
//          items: itemsArray,
//         total: getTotalAmount(),   // ✅ FIXED
//         address: orderData.address,
//         paymentMethod: orderData.paymentMethod
//       },
//       {
//         withCredentials: true   // ✅ MUST (auth ke liye)
//       }
//     );

//     return response.data;

//   } catch (error) {
//     console.error("Order error:", error.response?.data || error.message);
//     return { success: false };
//   }
// };


//   // 🔥 GET TOTAL AMOUNT
//   const getTotalAmount = () => {
//     return menuItems.reduce((total, item) => {
//       if (cartItems[item._id]) {
//         total += item.price * cartItems[item._id];
//       }
//       return total;
//     }, 0) + 5; // + delivery fee
//   };

//   // 🔥 FETCH USER ORDERS
// //   const fetchUserOrders = async () => {
// //     try {
// //      const response = await axios.get("http://localhost:5000/api/menu/all");

// //       setOrders(response.data.orders || []);
// //     } catch (error) {
// //       console.error("Orders fetch error:", error);
// //     }
// //   };


// // const fetchUserOrders = async () => {
// //   try {
// //     const response = axios.post("http://localhost:5000/api/orders", data, {
// //   withCredentials: true
// // });

// //     setOrders(response.data.orders || []);
// //   } catch (error) {
// //     console.error("Orders fetch error:", error);
// //   }
// // };


// const itemsArray = Object.keys(orderData.items).map(id => {
//   const item = menuItems.find(i => i._id === id);

//   return {
//     itemId: id,
//     quantity: orderData.items[id],
//     sellerId: item?.sellerId   // ✅ yaha se aayega
//   };
// });


// const fetchUserOrders = async () => {
//   try {
//     const response = await axios.get("http://localhost:5000/api/orders", {
//       withCredentials: true
//     });

//     const data = response.data; // ✅ ADD THIS LINE

//     console.log(data); // now works
//     setOrders(data.orders || []);

//   } catch (error) {
//     console.error("Orders fetch error:", error);
//   }
// };





//   // 🔥 TOAST AUTO HIDE
//   useEffect(() => {
//     if (toast.show) {
//       const timer = setTimeout(() => {
//         setToast(prev => ({ ...prev, show: false }));
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [toast]);

//   // 🔥 ✅ INITIAL LOAD - MENU + USER CHECK
// //   useEffect(() => {
// //     fetchMenuItems();
// //     fetchUserOrders();
// //     checkAuth();  // ✅ USER CHECK ADDED
// //   }, []);


// useEffect(() => {
//   fetchMenuItems();   // menu always load
//   checkAuth();        // user check
// }, []);

// useEffect(() => {
//   if (user) {
//     fetchUserOrders();  // only when user exists
//   }
// }, [user]);

//   // 🔥 ✅ PERFECT CONTEXT VALUE
//   const contextValue = {
//     user,           // ✅ ADDED
//     setUser,        // ✅ ADDED
//     menuItems,
//     cartItems,
//     orders,
//     loading,
//     getTotalItems,
//     getTotalAmount,
//     addToCart,
//     removeFromCart,
//     clearCart,
//     placeOrder,
//     fetchUserOrders,
//     toast,
//     setToast
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {children}
//       {toast.show && (
//         <Toast message={toast.message} type={toast.type} />
//       )}
//     </StoreContext.Provider>
//   );
// };

// // 🔥 TOAST COMPONENT
// const Toast = ({ message, type }) => (
//   <div className={`fixed top-20 right-4 z-50 p-4 rounded-xl shadow-2xl animate-slide-in transform transition-all ${
//     type === 'success' ? 'bg-emerald-500 text-white' :
//     type === 'error' ? 'bg-red-500 text-white' :
//     type === 'remove' ? 'bg-orange-500 text-white' :
//     'bg-blue-500 text-white'
//   }`}>
//     {message}
//   </div>
// );

// export { StoreContextProvider };



















// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const StoreContext = createContext(null);

// const StoreContextProvider = ({ children }) => {

//   const [user, setUser] = useState(null);
//   const [menuItems, setMenuItems] = useState([]);
//   const [cartItems, setCartItems] = useState({});
//   const [orders, setOrders] = useState([]);
//   const [toast, setToast] = useState({ message: "", type: "", show: false });
//   const [loading, setLoading] = useState(true);

//   // ✅ TOTAL ITEMS
//   const getTotalItems = () => {
//     return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
//   };

//   // ✅ CHECK USER LOGIN
//   const checkAuth = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/users/profile", {
//         withCredentials: true
//       });

//       if (res.data.success) {
//         setUser(res.data.user);
//       }
//     } catch {
//       setUser(null);
//     }
//   };

//   // ✅ FETCH MENU
//   const fetchMenuItems = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://localhost:5000/api/menu/all");
//       setMenuItems(res.data.items || []);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ CART FUNCTIONS
//   const addToCart = (id) => {
//     setCartItems(prev => ({
//       ...prev,
//       [id]: (prev[id] || 0) + 1
//     }));
//   };

//   const removeFromCart = (id) => {
//     setCartItems(prev => {
//       const updated = { ...prev };
//       if (updated[id] <= 1) delete updated[id];
//       else updated[id] -= 1;
//       return updated;
//     });
//   };

//   const clearCart = () => setCartItems({});

//   // ✅ TOTAL AMOUNT
//   const getTotalAmount = () => {
//     return menuItems.reduce((total, item) => {
//       if (cartItems[item._id]) {
//         total += item.price * cartItems[item._id];
//       }
//       return total;
//     }, 0) + 5;
//   };

//   // ✅ PLACE ORDER (🔥 FIXED)
//   // const placeOrder = async (orderData) => {
//   //   try {

//   //     // ✅ IMPORTANT FIX
//   //     const itemsArray = Object.keys(orderData.items).map(id => {
//   //       const item = menuItems.find(i => i._id === id);

//   //       return {
//   //         itemId: id,
//   //         quantity: orderData.items[id],
//   //         sellerId: item?.sellerId   // 🔥 seller mapping
//   //       };
//   //     });

//   //     const res = await axios.post(
//   //       "http://localhost:5000/api/orders",
//   //       {
//   //         items: itemsArray,
//   //         total: getTotalAmount(),
//   //         address: orderData.address,
//   //         paymentMethod: orderData.paymentMethod
//   //       },
//   //       {
//   //         withCredentials: true
//   //       }
//   //     );

//   //     return res.data;

//   //   } catch (error) {
//   //     console.error("Order error:", error.response?.data || error.message);
//   //     return { success: false };
//   //   }
//   // };


// const placeOrder = async (address, paymentMethod) => {
//   try {
//     const items = Object.keys(cartItems).map(itemId => {
//       const item = menuItems.find(i => i._id === itemId);
//       return {
//         itemId,
//         quantity: cartItems[itemId],
//         sellerId: item?.sellerId   // VERY IMPORTANT
//       };
//     });

//     const sellerId = items[0]?.sellerId; // assume same seller

//     const res = await axios.post(
//       "http://localhost:5000/api/orders",
//       {
//         sellerId,
//         items,
//         total: getTotalAmount(),
//         address,   // string is fine now
//         paymentMethod
//       },
//       {
//         withCredentials: true
//       }
//     );

//     return res.data;

//   } catch (err) {
//     console.log("Order error:", err.response?.data || err.message);
//     return { success: false };
//   }
// };



//   // ✅ FETCH USER ORDERS
//   const fetchUserOrders = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/orders", {
//         withCredentials: true
//       });

//       setOrders(res.data.orders || []);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ✅ INIT
//   useEffect(() => {
//     fetchMenuItems();
//     checkAuth();
//   }, []);

//   useEffect(() => {
//     if (user) fetchUserOrders();
//   }, [user]);

//   const contextValue = {
//     user,
//     setUser,
//     menuItems,
//     cartItems,
//     orders,
//     loading,
//     addToCart,
//     removeFromCart,
//     clearCart,
//     getTotalItems,
//     getTotalAmount,
//     placeOrder,
//     fetchUserOrders
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {children}
//     </StoreContext.Provider>
//   );
// };

// export { StoreContextProvider };















// import { createContext, useState, useEffect, useRef } from "react";
// import axios from "axios";

// axios.defaults.withCredentials = true; // ✅ GLOBAL FIX

// export const StoreContext = createContext(null);

// const StoreContextProvider = ({ children }) => {

//   const [user, setUser] = useState(null);
//   const [menuItems, setMenuItems] = useState([]);
//   const [cartItems, setCartItems] = useState({});
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Prevent double API calls
//   const hasFetched = useRef(false);
//   const hasFetchedOrders = useRef(false);

//   // ✅ TOTAL ITEMS
//   const getTotalItems = () => {
//     return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
//   };

//   // ✅ CHECK USER LOGIN
//   const checkAuth = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/users/profile");

//       if (res.data.success) {
//         setUser(res.data.user);
//       }
//     } catch {
//       setUser(null);
//     }
//   };

//   // ✅ FETCH MENU
//   const fetchMenuItems = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://localhost:5000/api/menu/all");
//       setMenuItems(res.data.items || []);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ CART FUNCTIONS
//   const addToCart = (id) => {
//     setCartItems(prev => ({
//       ...prev,
//       [id]: (prev[id] || 0) + 1
//     }));
//   };

//   const removeFromCart = (id) => {
//     setCartItems(prev => {
//       const updated = { ...prev };
//       if (updated[id] <= 1) delete updated[id];
//       else updated[id] -= 1;
//       return updated;
//     });
//   };

//   const clearCart = () => setCartItems({});

//   // ✅ TOTAL AMOUNT
//   const getTotalAmount = () => {
//     return menuItems.reduce((total, item) => {
//       if (cartItems[item._id]) {
//         total += item.price * cartItems[item._id];
//       }
//       return total;
//     }, 0) + 5;
//   };

//   // ✅ PLACE ORDER (FIXED)
//   const placeOrder = async (address, paymentMethod) => {
//     try {
//       const items = Object.keys(cartItems).map(itemId => {
//         const item = menuItems.find(i => i._id === itemId);
//         return {
//           itemId,
//           quantity: cartItems[itemId],
//           sellerId: item?.sellerId
//         };
//       });

//       const sellerId = items[0]?.sellerId;

//       const res = await axios.post(
//         "http://localhost:5000/api/orders",
//         {
//           sellerId,
//           items,
//           total: getTotalAmount(),
//           address,
//           paymentMethod
//         }
//       );

//       return res.data;

//     } catch (err) {
//       console.log("Order error:", err.response?.data || err.message);
//       return { success: false };
//     }
//   };

//   // ✅ FETCH USER ORDERS
//   const fetchUserOrders = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/orders");
//       setOrders(res.data.orders || []);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ✅ INIT (FIXED DOUBLE CALL)
//   useEffect(() => {
//     if (hasFetched.current) return;

//     fetchMenuItems();
//     checkAuth();

//     hasFetched.current = true;
//   }, []);

//   // ✅ FETCH ORDERS ON LOGIN (FIXED)
//   useEffect(() => {
//     if (user && !hasFetchedOrders.current) {
//       fetchUserOrders();
//       hasFetchedOrders.current = true;
//     }
//   }, [user]);

//   const contextValue = {
//     user,
//     setUser,
//     menuItems,
//     cartItems,
//     orders,
//     loading,
//     addToCart,
//     removeFromCart,
//     clearCart,
//     getTotalItems,
//     getTotalAmount,
//     placeOrder,
//     fetchUserOrders
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {children}
//     </StoreContext.Provider>
//   );
// };

// export { StoreContextProvider };











import { createContext, useState, useEffect, useRef } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
const [user, setUser] = useState(null);
const [orders, setOrders] = useState([]);

  const hasFetched = useRef(false);

  const getTotalItems = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);
const placeOrder = async (deliveryData, method) => {
  try {
    const items = Object.keys(cartItems)
      .filter(id => id && cartItems[id])
      .map(id => ({
        productId: id,
        quantity: cartItems[id]
      }));

    if (items.length === 0) {
      return { success: false, msg: "Cart empty" };
    }

    // 🔥 FIXED seller check
    const sellerIds = Object.keys(cartItems)
      .map(id => {
        const product = menuItems.find(item => item._id === id);
        if (!product) return null;
        return product.sellerId?.toString();
      })
      .filter(Boolean); // remove null/undefined

    const unique = [...new Set(sellerIds)];

    console.log("SELLERS:", unique); // ✅ debug

    if (unique.length > 1) {
      alert("Please order from one restaurant at a time");
      return { success: false };
    }

    const res = await axios.post(
      "http://localhost:5000/api/orders",
      {
        items,
        total: getTotalAmount(),
        address: deliveryData,
        paymentMethod: method
      },
      { withCredentials: true }
    );

    return res.data;

  } catch (err) {
  console.log("ORDER ERROR:", err.response?.data || err.message);

  return {
    success: false,
    msg: err.response?.data?.msg || "Order failed"
  };
}
};

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/menu/all");
      setMenuItems(res.data.items || []);
    } catch (err) {
      console.log(err);
      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  };

  
 
  const addToCart = (id) => {
    setCartItems(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const removeFromCart = (id) => {
    setCartItems(prev => {
      const updated = { ...prev };
      if (updated[id] <= 1) delete updated[id];
      else updated[id] -= 1;
      return updated;
    });
  };

  const fetchUserOrders = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/orders/user",
      { withCredentials: true }
    );

    setOrders(res.data.orders || []);
  } catch (err) {
    console.log("FETCH ORDERS ERROR:", err);
    setOrders([]);
  }
};

  const clearCart = () => setCartItems({});

  const getTotalAmount = () => {
  return menuItems.reduce((total, item) => {
  if (cartItems[item._id]) {
    total += item.price * cartItems[item._id];
  }
  return total;
}, 0);
  };

  useEffect(() => {
    if (hasFetched.current) return;
    fetchMenuItems();
    hasFetched.current = true;
  }, []);

  const contextValue = {
    cartItems,
    menuItems,
    loading,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalAmount,
    fetchMenuItems,
    placeOrder,
    user,         
    setUser, 
     orders,
  fetchUserOrders 
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContextProvider };