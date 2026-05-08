// import React, { useContext } from "react";
// import { StoreContext } from "../context/StoreContext";
// import { useNavigate } from "react-router-dom";
// import AuthModal from "../components/Navbar/LoginChoice";

// const Cart = () => {
//   const navigate = useNavigate();
//   const [authOpen, setAuthOpen] = useState(false);

//   const {
//     menuItems,
//     cartItems,
//     getTotalAmount,
//     removeFromCart,
//     clearCart,
//     loading
//   } = useContext(StoreContext);

//   const deliveryFee = 5;
//   const subtotal = getTotalAmount() - deliveryFee;

//   const handleCheckout = () => {
//     // Check auth (your existing logic)
//     const user = localStorage.getItem("user");
//     if (!user) {
//       setAuthOpen(true);
//       return;
//     }
//     navigate("/place-order");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto mt-20 px-4 py-12">
//       {/* Header */}
//       <div className="text-center mb-16">
//         <h1 className="text-5xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
//           Your Cart
//         </h1>
//         <p className="text-xl text-gray-600">
//           {Object.keys(cartItems).length} items in your cart
//         </p>
//       </div>

//       {/* Empty Cart */}
//       {Object.keys(cartItems).length === 0 && (
//         <div className="text-center py-24">
//           <div className="w-32 h-32 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
//             <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 7.5M7 13l-1.5 7.5M17 13l1.5 7.5M17 13l2.6-6.5M20.6 7H17M7 13h10" />
//             </svg>
//           </div>
//           <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
//           <p className="text-xl text-gray-500 mb-8">Add some delicious items to get started</p>
//           <button
//             onClick={() => navigate("/menu")}
//             className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-12 py-4 rounded-3xl font-bold text-xl hover:shadow-2xl transition-all"
//           >
//             Continue Shopping →
//           </button>
//         </div>
//       )}

//       {/* Cart Items */}
//       {Object.keys(cartItems).length > 0 && (
//         <>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
//             {/* Items List */}
//             <div className="space-y-6">
//               {menuItems.map(item => {
//                 const quantity = cartItems[item._id];
//                 if (!quantity) return null;

//                 return (
//                   <div key={item._id} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-gray-100">
//                     <div className="flex gap-6 items-start">
//                       <img
//                         src={item.imageUrl || item.image}
//                         alt={item.name}
//                         className="w-28 h-28 object-cover rounded-2xl flex-shrink-0"
//                       />
//                       <div className="flex-1 min-w-0">
//                         <h3 className="text-2xl font-bold text-gray-900 mb-2 truncate">{item.name}</h3>
//                         <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
//                         <div className="flex items-center justify-between">
//                           <span className="text-3xl font-black text-orange-500">
//                             ₹{(item.price * quantity).toLocaleString()}
//                           </span>
                          
//                           {/* Quantity Controls */}
//                           <div className="flex items-center bg-gray-100 rounded-2xl p-2">
//                             <button
//                               onClick={() => removeFromCart(item._id)}
//                               className="w-12 h-12 rounded-xl bg-white flex items-center justify-center font-bold text-xl hover:bg-orange-100 transition-all shadow-md hover:shadow-lg"
//                             >
//                               -
//                             </button>
//                             <span className="w-16 text-center text-2xl font-bold mx-4">{quantity}</span>
//                             <button
//                               onClick={() => addToCart(item._id)}
//                               className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-xl hover:bg-orange-600 transition-all shadow-md hover:shadow-lg"
//                             >
//                               +
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Order Summary */}
//             <div className="lg:sticky lg:top-24 h-fit">
//               <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-10 shadow-2xl border border-orange-100">
//                 <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">Order Summary</h2>
                
//                 <div className="space-y-4 mb-8">
//                   <div className="flex justify-between text-xl">
//                     <span>Subtotal ({Object.keys(cartItems).length} items)</span>
//                     <span>₹{subtotal.toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between text-xl py-2 border-t border-orange-200">
//                     <span>Delivery Fee</span>
//                     <span>₹{deliveryFee}</span>
//                   </div>
//                 </div>

//                 <div className="bg-white rounded-2xl p-6 mb-8 shadow-inner">
//                   <div className="flex justify-between items-center text-2xl font-black text-gray-900">
//                     <span>Total</span>
//                     <span>₹{getTotalAmount().toLocaleString()}</span>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleCheckout}
//                   className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-5 rounded-3xl font-black text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-1 mb-4"
//                 >
//                   Proceed to Checkout →
//                 </button>

//                 <button
//                   onClick={clearCart}
//                   className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-all"
//                 >
//                   Clear Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       {authOpen && <AuthModal setAuthOpen={setAuthOpen} />}
//     </div>
//   );
// };

// export default Cart;


                        // correct 

// import React, { useContext, useState } from "react";  // ✅ useState ADDED
// import { StoreContext } from "../../context/StoreContext"; 
// import { useNavigate } from "react-router-dom";
// // import AuthModal from "../components/Navbar/LoginChoice";  // ✅ CORRECT PATH

// const Cart = () => {
//   const navigate = useNavigate();
//   const [authOpen, setAuthOpen] = useState(false);  // ✅ useState INITIALIZED

//   const {
//     menuItems,
//     cartItems,
//     getTotalAmount,
//     removeFromCart,
//     clearCart,
//     loading,
//     addToCart  // ✅ ADDED MISSING addToCart
//   } = useContext(StoreContext);

//   const deliveryFee = 5;
//   const subtotal = getTotalAmount() - deliveryFee;

//   const handleCheckout = () => {
//     // ✅ IMPROVED AUTH CHECK - using context first, then localStorage
//     const user = localStorage.getItem("user");
//     if (!user) {
//       setAuthOpen(true);
//       return;
//     }
//     navigate("/place-order");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto mt-20 px-4 py-12">
//       {/* Header */}
//       <div className="text-center mb-16">
//         <h1 className="text-5xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
//           Your Cart
//         </h1>
//         <p className="text-xl text-gray-600">
//           {Object.keys(cartItems).length} items in your cart
//         </p>
//       </div>

//       {/* Empty Cart */}
//       {Object.keys(cartItems).length === 0 && (
//         <div className="text-center py-24">
//           <div className="w-32 h-32 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
//             <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 7.5M7 13l-1.5 7.5M17 13l1.5 7.5M17 13l2.6-6.5M20.6 7H17M7 13h10" />
//             </svg>
//           </div>
//           <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
//           <p className="text-xl text-gray-500 mb-8">Add some delicious items to get started</p>
//           <button
//             onClick={() => navigate("/menu")}
//             className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-12 py-4 rounded-3xl font-bold text-xl hover:shadow-2xl transition-all"
//           >
//             Continue Shopping →
//           </button>
//         </div>
//       )}

//       {/* Cart Items */}
//       {Object.keys(cartItems).length > 0 && (
//         <>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
//             {/* Items List */}
//             <div className="space-y-6">
//               {menuItems.map(item => {
//                 const quantity = cartItems[item._id];
//                 if (!quantity) return null;

//                 return (
//                   <div key={item._id} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-gray-100">
//                     <div className="flex gap-6 items-start">
//                       <img
//                         src={item.imageUrl || item.image}
//                         alt={item.name}
//                         className="w-28 h-28 object-cover rounded-2xl flex-shrink-0"
//                       />
//                       <div className="flex-1 min-w-0">
//                         <h3 className="text-2xl font-bold text-gray-900 mb-2 truncate">{item.name}</h3>
//                         <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
//                         <div className="flex items-center justify-between">
//                           <span className="text-3xl font-black text-orange-500">
//                             ₹{(item.price * quantity).toLocaleString()}
//                           </span>
                          
//                           {/* Quantity Controls */}
//                           <div className="flex items-center bg-gray-100 rounded-2xl p-2">
//                             <button
//                               onClick={() => removeFromCart(item._id)}
//                               className="w-12 h-12 rounded-xl bg-white flex items-center justify-center font-bold text-xl hover:bg-orange-100 transition-all shadow-md hover:shadow-lg"
//                             >
//                               -
//                             </button>
//                             <span className="w-16 text-center text-2xl font-bold mx-4">{quantity}</span>
//                             <button
//                               onClick={() => addToCart(item._id)}  // ✅ NOW WORKS
//                               className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-xl hover:bg-orange-600 transition-all shadow-md hover:shadow-lg"
//                             >
//                               +
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Order Summary */}
//             <div className="lg:sticky lg:top-24 h-fit">
//               <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-10 shadow-2xl border border-orange-100">
//                 <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">Order Summary</h2>
                
//                 <div className="space-y-4 mb-8">
//                   <div className="flex justify-between text-xl">
//                     <span>Subtotal ({Object.keys(cartItems).length} items)</span>
//                     <span>₹{Math.max(0, subtotal).toLocaleString()}</span>  {/* ✅ FIXED NEGATIVE */}
//                   </div>
//                   <div className="flex justify-between text-xl py-2 border-t border-orange-200">
//                     <span>Delivery Fee</span>
//                     <span>₹{deliveryFee}</span>
//                   </div>
//                 </div>

//                 <div className="bg-white rounded-2xl p-6 mb-8 shadow-inner">
//                   <div className="flex justify-between items-center text-2xl font-black text-gray-900">
//                     <span>Total</span>
//                     <span>₹{getTotalAmount().toLocaleString()}</span>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleCheckout}
//                   className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-5 rounded-3xl font-black text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-1 mb-4"
//                 >
//                   Proceed to Checkout →
//                 </button>

//                 <button
//                   onClick={clearCart}
//                   className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-all"
//                 >
//                   Clear Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Auth Modal */}
//       {authOpen && <AuthModal setAuthOpen={setAuthOpen} />}
//     </div>
//   );
// };

// export default Cart;













import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext"; 
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useContext(StoreContext);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const {
    menuItems,
    cartItems,
    getTotalAmount,
    removeFromCart,
    clearCart,
    loading,
    addToCart,
    placeOrder  
  } = useContext(StoreContext);

  const deliveryFee = 5;
  const subtotal = getTotalAmount() - deliveryFee;

  const handleCheckout = () => {
  if (!user) {
    alert("Please login first");
    setShowLoginModal(true); 
    return;
  }

  navigate("/place-order");
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
          Your Cart
        </h1>
        <p className="text-xl text-gray-600">
          {Object.keys(cartItems).length} items in your cart
        </p>
      </div>

      {/* Empty Cart */}
      {Object.keys(cartItems).length === 0 && (
        <div className="text-center py-24">
          <div className="w-32 h-32 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 7.5M7 13l-1.5 7.5M17 13l1.5 7.5M17 13l2.6-6.5M20.6 7H17M7 13h10" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-xl text-gray-500 mb-8">Add some delicious items to get started</p>
          <button
            onClick={() => navigate("/menu")}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-12 py-4 rounded-3xl font-bold text-xl hover:shadow-2xl transition-all"
          >
            Continue Shopping →
          </button>
        </div>
      )}

      {/* Cart Items */}
      {Object.keys(cartItems).length > 0 && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Items List - SAME */}
            <div className="space-y-6">
              {menuItems.map(item => {
                const quantity = cartItems[item._id];
                if (!quantity) return null;

                return (
                  <div key={item._id} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-gray-100">
                    <div className="flex gap-6 items-start">
                      <img
                        src={item.imageUrl || item.image}
                        alt={item.name}
                        className="w-28 h-28 object-cover rounded-2xl flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 truncate">{item.name}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-black text-orange-500">
                            ₹{(item.price * quantity).toLocaleString()}
                          </span>
                          <div className="flex items-center bg-gray-100 rounded-2xl p-2">
                            <button
                              onClick={() => removeFromCart(item._id)}
                              className="w-12 h-12 rounded-xl bg-white flex items-center justify-center font-bold text-xl hover:bg-orange-100 transition-all shadow-md hover:shadow-lg"
                            >
                              -
                            </button>
                            <span className="w-16 text-center text-2xl font-bold mx-4">{quantity}</span>
                            <button
                              onClick={() => addToCart(item._id)}
                              className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-xl hover:bg-orange-600 transition-all shadow-md hover:shadow-lg"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-10 shadow-2xl border border-orange-100">
                <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-xl">
                    <span>Subtotal ({Object.keys(cartItems).length} items)</span>
                    <span>₹{Math.max(0, subtotal).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xl py-2 border-t border-orange-200">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 mb-8 shadow-inner">
                  <div className="flex justify-between items-center text-2xl font-black text-gray-900">
                    <span>Total</span>
                    <span>₹{getTotalAmount().toLocaleString()}</span>
                  </div>
                </div>

                {/*  SIMPLIFIED - Direct PlaceOrder */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-5 rounded-3xl font-black text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-1 mb-4"
                >
                  Proceed to Checkout →
                </button>

                <button
                  onClick={clearCart}
                  className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;