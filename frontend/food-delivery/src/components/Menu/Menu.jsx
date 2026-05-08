// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { FaRupeeSign, FaUtensils, FaClock, FaMapMarkerAlt, FaSyncAlt, FaPlusCircle, FaEdit } from "react-icons/fa";
// import { Link } from "react-router-dom";


// const Menu = ({ limit = 999, className = "" }) => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [isSeller, setIsSeller] = useState(false);  // 🔥 Seller check

//   const categories = ["All", "Noodles", "Pizza", "Burger", "Rice", "Biryani", "Chinese", "South Indian", "Desserts", "Drinks"];

//   // 🔥 Check if seller
//   const checkSeller = useCallback(async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/seller/profile", {
//         withCredentials: true
//       });
//       setIsSeller(response.data.success);
//     } catch {
//       setIsSeller(false);
//     }
//   }, []);

//   const fetchMenuItems = useCallback(async () => {
//   try {
//     setLoading(true);

//     const response = await axios.get("http://localhost:5000/api/menu/all", {
//       withCredentials: true
//     });

//     console.log("API RESPONSE:", response.data);

//    setMenuItems(response.data.items || []);

//   } catch (error) {
//     console.error("Menu fetch error:", error);
//   } finally {
//     setLoading(false);
//   }
// }, []);


//   useEffect(() => {
//   checkSeller();
//   fetchMenuItems();
// }, [fetchMenuItems, checkSeller]);


//   const filteredItems = selectedCategory === "All" 
//     ? menuItems.slice(0, limit)
//     : menuItems.filter(item => item.category === selectedCategory).slice(0, limit);

//   if (loading) {
//     return (
//       <div className={`min-h-screen ${className} bg-gradient-to-br from-slate-50 to-indigo-100 flex items-center justify-center py-20`}>
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-indigo-600 mx-auto mb-8"></div>
//           <h2 className="text-3xl font-bold text-gray-700 mb-2">Loading Menu...</h2>
//           <p className="text-xl text-gray-500">Just a moment...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen mt-35 py-12 px-4 sm:px-6 lg:px-8 ${className} bg-gradient-to-br from-slate-50 to-indigo-100`}>
//       <div className="max-w-7xl mx-auto">
        
//         {/* Seller Header */}
//         {isSeller && (
//           <div className="mb-12 text-center">
//             <div className="inline-flex items-center gap-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-4xl shadow-2xl">
//               <FaUtensils className="w-12 h-12" />
//               <div>
//                 <h1 className="text-4xl font-black">Your Restaurant Menu</h1>
//                 <p className="text-xl opacity-90 mt-2">Manage your delicious menu items</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Category Filters */}
//         <div className="flex flex-wrap justify-center gap-3 mb-12 pb-8 border-b-4 border-indigo-100">
//           {categories.map(cat => (
//             <button
//               key={cat}
//               onClick={() => setSelectedCategory(cat)}
//               className={`px-3 py-2 rounded-3xl text-lg font-bold shadow-xl transition-all duration-500 hover:scale-110 hover:shadow-2xl border-4 backdrop-blur-xl ${
//                 selectedCategory === cat
//                   ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400 shadow-purple-500/50"
//                   : "bg-white/90 text-gray-800 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* Items Counter */}
//         <div className="text-center mb-12">
//           <p className="text-4xl font-black text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-xl">
//             {filteredItems.length} Items Found
//           </p>
//           <p className="text-xl text-gray-600 mt-2">in <span className="font-bold text-indigo-600">{selectedCategory}</span> category</p>
//         </div>

//         {/* 🔥 Seller Action Card */}
//         {isSeller && (
//           <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
//             <Link to="/add-items" className="md:col-span-2 group">
//               <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-10 rounded-4xl shadow-2xl hover:shadow-3xl hover:-translate-y-4 transition-all duration-500 border-4 border-white/20">
//                 <div className="flex items-center gap-6">
//                   <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
//                     <FaPlusCircle className="w-12 h-12" />
//                   </div>
//                   <div>
//                     <h3 className="text-3xl font-black mb-3">Add New Menu Item</h3>
//                     <p className="text-xl opacity-90">Add your restaurant's delicious dishes</p>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//             <Link to ="/orders" className="group">
//               <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-10 rounded-4xl shadow-2xl hover:shadow-3xl hover:-translate-y-4 transition-all duration-500 border-4 border-white/20">
//                 <div className="flex items-center gap-4">
//                   <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
//                     <FaUtensils className="w-10 h-10" />
//                   </div>
//                   <div className="text-center">
//                     <h3 className="text-2xl font-black mb-2">View Orders</h3>
//                     <p className="text-lg opacity-90">Check new orders</p>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         )}

//         {/* Menu Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
//           {filteredItems.length > 0 ? (
//             filteredItems.map((item) => (
//               <MenuCard key={item._id || Math.random()} item={item} isSeller={isSeller} />
//             ))
//           ) : (
//             <div className="col-span-full flex flex-col items-center justify-center py-10 text-center">
//               <FaUtensils className="w-32 h-32 text-gray-300 mb-8 animate-bounce" />
//               <h2 className="text-5xl font-black text-gray-400 mb-6">No Food Items</h2>
//               <p className="text-2xl text-gray-500 mb-12 max-w-2xl mx-auto">
//                 No dishes available in <span className="font-bold text-indigo-600">"{selectedCategory}"</span> 
//                 category right now.
//               </p>
//               <button 
//                 onClick={fetchMenuItems}
//                 className="flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xl font-black rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300"
//               >
//                 <FaSyncAlt className="w-6 h-6" />
//                 Refresh Menu
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // 🔥 Enhanced MenuCard with Seller actions
// const MenuCard = ({ item, isSeller }) => {
//   return (
//     <div className="group bg-white/95 backdrop-blur-xl rounded-4xl shadow-2xl hover:shadow-4xl border border-white/50 overflow-hidden transition-all duration-700 hover:-translate-y-6 hover:scale-105 cursor-pointer h-full relative">
      
//       {/* Seller Edit Button */}
//       {isSeller && (
//         <button className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white p-2 rounded-3xl shadow-2xl hover:shadow-3xl transition-all opacity-0 group-hover:opacity-100">
//           <FaEdit className="w-5 h-5 text-indigo-600 hover:text-indigo-700" />
//         </button>
//       )}

//       {/* Image */}
//       <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-indigo-50">
//       <img 
//   src={item.image || "https://ik.imagekit.io/jcit10tyd/placeholder-menu.jpg"}
//   alt={item.name}
//   className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
// />
//         {/* Badges */}
//         <span className={`absolute top-6 right-6 px-4 py-2 rounded-3xl text-sm font-black shadow-2xl ${
//           item.isAvailable ? "bg-emerald-500 text-white" : "bg-gray-500 text-white"
//         }`}>
//           {item.isAvailable ? "LIVE" : " OUT"}
//         </span>
//         <span className="absolute top-6 left-6 px-4 py-2 rounded-3xl text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl">
//           {item.category}
//         </span>
//       </div>

//       {/* Content */}
//       <div className="p-8">
//         <h3 className="text-2xl font-black text-gray-900 mb-4 line-clamp-2 group-hover:text-indigo-600 transition-colors">
//           {item.name}
//         </h3>
        
//         <div className="flex items-center mb-6">
//           <FaMapMarkerAlt className="w-5 h-5 text-emerald-600 mr-3" />
//           <span className="text-lg font-semibold text-gray-700">{item.restaurantName}</span>
//         </div>
        
//         <p className="text-gray-600 mb-8 text-base line-clamp-3 leading-relaxed">
//           {item.description || "Freshly made with premium ingredients"}
//         </p>

//         {/* Price & Time */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center">
//             <span className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl text-white shadow-xl mr-3">
//               <FaRupeeSign className="w-5 h-5" />
//             </span>
//             <span className="text-3xl font-black text-gray-900">
//               {parseFloat(item.price || 0).toLocaleString()}
//             </span>
//           </div>
//           <div className="text-right p-3 bg-indigo-50 rounded-2xl">
//             <div className="flex items-center text-indigo-700 font-bold">
//               <FaClock className="w-4 h-4 mr-1" />
//               {item.prepTime || 25} min
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="space-y-3">
//           <button className="w-full bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-white font-black py-4 px-8 rounded-3xl text-lg shadow-3xl hover:shadow-4xl transition-all duration-500 hover:-translate-y-1 backdrop-blur-xl">
//              Order Now
//           </button>
          
//           {/* 🔥 Seller Extra Button */}
//           {isSeller && (
//             <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-2xl text-sm shadow-xl hover:shadow-2xl transition-all duration-300">
//             Quick Edit
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Menu;







// correct 

import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { FaRupeeSign, FaUtensils, FaClock, FaMapMarkerAlt, FaSyncAlt, FaPlusCircle, FaEdit, FaMinus, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Menu = ({ limit = 999, className = "" }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSeller, setIsSeller] = useState(false);

  // Cart Context
  
const context = useContext(StoreContext);
const { addToCart, cartItems, getTotalItems } = context || {};
  const navigate = useNavigate();

  const categories = ["All", "Noodles", "Pizza", "Burger", "Rice", "Biryani", "Chinese", "South Indian", "Desserts", "Drinks"];

  // Check if seller
  const checkSeller = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/seller/profile", {
        withCredentials: true
      });
      setIsSeller(response.data.success);
    } catch {
      setIsSeller(false);
    }
  }, []);

  // Fetch menu
  const fetchMenuItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/menu/all", {
        withCredentials: true
      });
      console.log("API RESPONSE:", response.data);
      setMenuItems(response.data.items || []);
    } catch (error) {
      console.error("Menu fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSeller();
    fetchMenuItems();
  }, [fetchMenuItems, checkSeller]);

  const filteredItems = selectedCategory === "All" 
    ? menuItems.slice(0, limit)
    : menuItems.filter(item => item.category === selectedCategory).slice(0, limit);

  if (loading) {
    return (
      <div className={`min-h-screen ${className} bg-gradient-to-br from-slate-50 to-indigo-100 flex items-center justify-center py-20`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-indigo-600 mx-auto mb-8"></div>
          <h2 className="text-3xl font-bold text-gray-700 mb-2">Loading Menu...</h2>
          <p className="text-xl text-gray-500">Just a moment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen px-4 sm:px-6 lg:px-8 ${className} bg-gradient-to-br from-slate-50 to-indigo-100`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Seller Header */}
        {isSeller && (
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-4xl shadow-2xl">
              <FaUtensils className="w-12 h-12" />
              <div>
                <h1 className="text-4xl font-black">View Your Item In Menu</h1>
                <p className="text-xl opacity-90 mt-2">Manage your delicious menu items</p>
              </div>
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 pb-8 border-b-4 border-indigo-100">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-3xl text-lg font-bold shadow-xl transition-all duration-500 hover:scale-110 hover:shadow-2xl border-4 backdrop-blur-xl ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400 shadow-purple-500/50"
                  : "bg-white/90 text-gray-800 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items Counter */}
        <div className="text-center mb-12">
          <p className="text-4xl font-black text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-xl">
            {filteredItems.length} Items Found
          </p>
          <p className="text-xl text-gray-600 mt-2">in <span className="font-bold text-indigo-600">{selectedCategory}</span> category</p>
        </div>

        {/* Seller Action Card */}
        {isSeller && (
          <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/add-items" className="md:col-span-2 group">
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-10 rounded-4xl shadow-2xl hover:shadow-3xl hover:-translate-y-4 transition-all duration-500 border-4 border-white/20">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaPlusCircle className="w-12 h-12" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black mb-3">Add New Menu Item</h3>
                    <p className="text-xl opacity-90">Add your restaurant's delicious dishes</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/orders" className="group">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-10 rounded-4xl shadow-2xl hover:shadow-3xl hover:-translate-y-4 transition-all duration-500 border-4 border-white/20">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaUtensils className="w-10 h-10" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-black mb-2">View Orders</h3>
                    <p className="text-lg opacity-90">Check new orders</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Cart Counter - Only for Users */}
        {!isSeller && (
          <div className="mb-8 text-center">
            <Link to="/cart" className="group inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300">
              <span> Cart ({getTotalItems()})</span>
              <div className="w-6 h-6 bg-white/30 rounded-full group-hover:scale-110 transition-transform"></div>
            </Link>
          </div>
        )}

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <MenuCard 
                key={item._id || Math.random()} 
                item={item} 
                isSeller={isSeller}
                addToCart={addToCart}
                cartItems={cartItems}
                navigate={navigate}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-10 text-center">
              <FaUtensils className="w-32 h-32 text-gray-300 mb-8 animate-bounce" />
              <h2 className="text-5xl font-black text-gray-400 mb-6">No Food Items</h2>
              <p className="text-2xl text-gray-500 mb-12 max-w-2xl mx-auto">
                No dishes available in <span className="font-bold text-indigo-600">"{selectedCategory}"</span> 
                category right now.
              </p>
              <button 
                onClick={fetchMenuItems}
                className="flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xl font-black rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300"
              >
                <FaSyncAlt className="w-6 h-6" />
                Refresh Menu
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// COMPLETE MenuCard with Cart Functionality (Seller SAFE)
const MenuCard = ({ item, isSeller, addToCart, cartItems, navigate }) => {
  const [showQuantity, setShowQuantity] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const existingQty = cartItems[item._id] || 0;

  // Add to Cart with Quantity
  const handleAddToCart = async () => {
    if (isSeller) return; // Seller can't add to own cart
    
    setAdding(true);
    try {
      // Add multiple quantity at once
      for(let i = 0; i < quantity; i++) {
        addToCart(item._id);
      }
      
      // Show success feedback
      setShowQuantity(false);
      setQuantity(1);
      
      // Optional: Navigate to cart
      // navigate("/cart");
    } catch (error) {
      console.error("Add to cart failed:", error);
    } finally {
      setAdding(false);
    }
  };

  // Quick Add Single
  const handleQuickAdd = () => {
    if (isSeller) return;
    addToCart(item._id);
  };

  return (
    <div className="group bg-white/95 backdrop-blur-xl rounded-4xl shadow-2xl hover:shadow-4xl border border-white/50 overflow-hidden transition-all duration-700 hover:-translate-y-6 hover:scale-105 cursor-pointer h-full relative">
      
      {/* Seller Edit Button */}
      {isSeller && (
        <button className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white p-2 rounded-3xl shadow-2xl hover:shadow-3xl transition-all opacity-0 group-hover:opacity-100">
          <FaEdit className="w-5 h-5 text-indigo-600 hover:text-indigo-700" />
        </button>
      )}

      {/* Already in Cart Badge */}
      {existingQty > 0 && !isSeller && (
        <div className="absolute top-4 left-4 z-20 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
          <span>🛒</span>
          <span>{existingQty}</span>
        </div>
      )}

      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-indigo-50">
        <img 
          src={item.image || "https://ik.imagekit.io/jcit10tyd/placeholder-menu.jpg"}
          alt={item.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
        />


        {/* Badges */}
        <span className={`absolute top-6 right-6 px-4 py-2 rounded-3xl text-sm font-black shadow-2xl ${
          item.isAvailable ? "bg-emerald-500 text-white" : "bg-gray-500 text-white"
        }`}>
          {item.isAvailable ? "LIVE" : "OUT"}
        </span>
        <span className="absolute top-6 left-6 px-4 py-2 rounded-3xl text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl">
          {item.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-2xl font-black text-gray-900 mb-4 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {item.name}
        </h3>
        
        <div className="flex items-center mb-6">
          <FaMapMarkerAlt className="w-5 h-5 text-emerald-600 mr-3" />
          <span className="text-lg font-semibold text-gray-700">{item.restaurantName}</span>
        </div>
        
        <p className="text-gray-600 mb-8 text-base line-clamp-3 leading-relaxed">
          {item.description || "Freshly made with premium ingredients"}
        </p>

        {/* Price & Time */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <span className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl text-white shadow-xl mr-3">
              <FaRupeeSign className="w-5 h-5" />
            </span>
            <span className="text-3xl font-black text-gray-900">
              {parseFloat(item.price || 0).toLocaleString()}
            </span>
          </div>
          <div className="text-right p-3 bg-indigo-50 rounded-2xl">
            <div className="flex items-center text-indigo-700 font-bold">
              <FaClock className="w-4 h-4 mr-1" />
              {item.prepTime || 25} min
            </div>
          </div>
        </div>

        {/* Action Buttons - Smart Logic */}
        <div className="space-y-3">
          {isSeller ? (
            /* SELLER BUTTONS */
            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-2xl text-sm shadow-xl hover:shadow-2xl transition-all duration-300">
              Quick Edit
            </button>
          ) : (
            /* USER CART BUTTONS */
            <>
              {showQuantity ? (
                /* Quantity Selector */
                <div className="space-y-3">
                  {/* Quantity Controls */}
                  <div className="bg-gradient-to-r from-emerald-400 to-green-500 p-2 rounded-3xl shadow-2xl">
                    <div className="bg-white rounded-2xl p-4 flex items-center justify-center gap-6">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={adding}
                        className="w-14 h-14 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-300 rounded-2xl flex items-center justify-center font-bold text-2xl transition-all shadow-md hover:shadow-lg disabled:shadow-none disabled:cursor-not-allowed"
                      >
                        <FaMinus />
                      </button>
                      
                      <span className="text-3xl font-black text-gray-900 bg-gradient-to-r from-gray-200 to-gray-300 px-6 py-3 rounded-2xl shadow-inner min-w-[4rem] text-center">
                        {quantity}
                      </span>
                      
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        disabled={adding}
                        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 rounded-2xl flex items-center justify-center font-bold text-2xl text-white transition-all shadow-lg hover:shadow-xl disabled:shadow-md disabled:cursor-not-allowed"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button 
                    onClick={handleAddToCart}
                    disabled={adding}
                    className={`w-full py-5 px-8 rounded-4xl font-black text-xl shadow-3xl transition-all transform flex items-center justify-center gap-3 ${
                      adding
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 hover:shadow-4xl hover:-translate-y-1 text-white"
                    }`}
                  >
                    {adding ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <span>✅ Add {quantity} to Cart</span>
                        <div className="w-5 h-5 bg-white/40 rounded-full"></div>
                      </>
                    )}
                  </button>

                  {/* Cancel Quantity */}
                  <button 
                    onClick={() => setShowQuantity(false)}
                    className="w-full text-gray-600 hover:text-gray-800 font-semibold py-3 px-6 rounded-2xl border-2 border-gray-200 hover:border-gray-400 transition-all bg-white/50 hover:bg-white"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                /* Initial Order Now */
                <div className="space-y-2">
                  {existingQty > 0 ? (
                    /* Already in Cart */
                    <button 
                      onClick={() => navigate("/cart")}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-black py-5 px-8 rounded-3xl text-xl shadow-3xl hover:shadow-4xl transition-all duration-500 hover:-translate-y-2 backdrop-blur-xl"
                    >
                       Go to Cart ({existingQty})
                    </button>
                  ) : (
                    /* Order Now Button */
                    <button 
                      onClick={() => setShowQuantity(true)}
                      className="w-full bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-white font-black py-5 px-8 rounded-3xl text-xl shadow-3xl hover:shadow-4xl transition-all duration-500 hover:-translate-y-2 backdrop-blur-xl group-hover:scale-105"
                    >
                       Order Now
                    </button>
                  )}
                  
                  {/* Quick Add Single */}
                  <button 
                    onClick={handleQuickAdd}
                    disabled={adding}
                    className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 font-bold py-3 px-6 rounded-2xl text-sm shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-300"
                  >
                    ➕ Quick Add 1
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;






