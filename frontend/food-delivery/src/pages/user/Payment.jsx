// import React, { useState, useContext } from "react";
// import { StoreContext } from "../context/StoreContext";
// import { useNavigate } from "react-router-dom";

// const Payment = () => {
//   const navigate = useNavigate();
//   const { menuItems, cartItems, getTotalAmount, placeOrder } = useContext(StoreContext);
//   const [method, setMethod] = useState("card");
//   const [paymentData, setPaymentData] = useState({});
//   const [loading, setLoading] = useState(false);

//   const deliveryFee = 5;
//   const total = getTotalAmount();

//   const paymentMethods = [
//     { id: "card", name: "Credit/Debit Card", icon: "💳" },
//     { id: "upi", name: "UPI", icon: "📱" },
//     { id: "netbank", name: "Net Banking", icon: "🏦" },
//     { id: "cod", name: "Cash on Delivery", icon: "💵" }
//   ];

//   const handlePayment = async () => {
//   setLoading(true);
  
//   try {
//     // ✅ Real address लो PlaceOrder से
//     const deliveryData = JSON.parse(sessionStorage.getItem('deliveryData') || '{}');
//     const address = `${deliveryData.address}, ${deliveryData.city}, ${deliveryData.state}`;
    
//     const result = await placeOrder(address, method);
    
//     if (result.success) {
//       // ✅ Clear cart & sessionStorage
//       sessionStorage.removeItem('deliveryData');
      
//       // ✅ TrackOrder page पर redirect
//       navigate("/track-order");
//       return;
//     }
//   } catch (error) {
//     console.error("Payment failed:", error);
//   } finally {
//     setLoading(false);
//   }
// };

//   const renderPaymentForm = () => {
//     switch (method) {
//       case "card":
//         return (
//           <div className="space-y-4">
//             <input
//               placeholder="Card Number (1234 5678 9012 3456)"
//               className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-200"
//               value={paymentData.cardNumber || ""}
//               onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
//             />
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 placeholder="MM/YY"
//                 className="p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-200"
//                 value={paymentData.expiry || ""}
//                 onChange={(e) => setPaymentData({...paymentData, expiry: e.target.value})}
//               />
//               <input
//                 placeholder="CVV"
//                 className="p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-200"
//                 value={paymentData.cvv || ""}
//                 onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
//               />
//             </div>
//             <input
//               placeholder="Cardholder Name"
//               className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-200"
//               value={paymentData.name || ""}
//               onChange={(e) => setPaymentData({...paymentData, name: e.target.value})}
//             />
//           </div>
//         );
//       case "upi":
//         return (
//           <input
//             placeholder="UPI ID (example@ybl)"
//             className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-200"
//             value={paymentData.upi || ""}
//             onChange={(e) => setPaymentData({...paymentData, upi: e.target.value})}
//           />
//         );
//       case "netbank":
//         return (
//           <select className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200">
//             <option>Select Bank</option>
//             <option>SBI</option>
//             <option>HDFC</option>
//             <option>ICICI</option>
//             <option>Axis Bank</option>
//           </select>
//         );
//       case "cod":
//         return (
//           <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 text-center">
//             <div className="text-4xl mb-4">💰</div>
//             <p className="text-lg font-semibold text-yellow-800">
//               Pay ₹{total.toLocaleString()} cash when your order arrives
//             </p>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 py-20">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
//           {/* Order Summary */}
//           <div className="lg:order-2">
//             <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100 sticky top-24">
//               <h2 className="text-3xl font-black mb-8 text-gray-900 text-center">Order Summary</h2>
              
//               <div className="space-y-4 mb-8">
//                 {menuItems.map(item => {
//                   const qty = cartItems[item._id];
//                   if (!qty) return null;
                  
//                   return (
//                     <div key={item._id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
//                       <div>
//                         <p className="font-semibold text-lg">{item.name}</p>
//                         <p className="text-sm text-gray-500">Qty: {qty}</p>
//                       </div>
//                       <p className="font-bold text-xl">₹{(item.price * qty).toLocaleString()}</p>
//                     </div>
//                   );
//                 })}
//               </div>

//               <div className="space-y-3 p-6 bg-gray-50 rounded-2xl">
//                 <div className="flex justify-between text-xl">
//                   <span>Subtotal</span>
//                   <span>₹{(total - deliveryFee).toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between text-xl font-bold">
//                   <span>Delivery</span>
//                   <span>₹{deliveryFee}</span>
//                 </div>
//                 <div className="flex justify-between text-2xl font-black text-orange-600 pt-4 border-t">
//                   <span>Total</span>
//                   <span>₹{total.toLocaleString()}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Payment Form */}
//           <div className="lg:order-1">
//             <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
//               <h2 className="text-3xl font-black mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Secure Payment
//               </h2>

//               {/* Payment Methods */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
//                 {paymentMethods.map(({ id, name, icon }) => (
//                   <button
//                     key={id}
//                     onClick={() => setMethod(id)}
//                     className={`p-6 rounded-2xl border-4 transition-all hover:shadow-xl hover:scale-105 flex flex-col items-center gap-3 font-semibold ${
//                       method === id
//                         ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white border-blue-400 shadow-2xl shadow-blue-500/25"
//                         : "bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
//                     }`}
//                   >
//                     <span className="text-3xl">{icon}</span>
//                     <span className="text-sm">{name}</span>
//                   </button>
//                 ))}
//               </div>

//               {/* Payment Form */}
//               <div className="space-y-6">
//                 {renderPaymentForm()}
                
//                 <button
//                   onClick={handlePayment}
//                   disabled={loading}
//                   className={`w-full py-5 rounded-3xl font-black text-xl shadow-2xl transition-all transform flex items-center justify-center gap-3 ${
//                     loading
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:shadow-3xl hover:-translate-y-1 text-white"
//                   }`}
//                 >
//                   {loading ? (
//                     <>
//                       <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       Processing...
//                     </>
//                   ) : (
//                     "Place Order Now →"
//                   )}
//                 </button>
//               </div>

//               <div className="mt-8 pt-8 border-t border-gray-200 text-center">
//                 <p className="text-sm text-gray-600">
//                   🔒 Secure • Lightning Fast • 100% Safe
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;














// import React, { useState, useContext, useEffect } from "react";
// import { StoreContext } from "../../context/StoreContext"; 
// import { useNavigate } from "react-router-dom";

// const Payment = () => {
//   const navigate = useNavigate();
// const { menuItems, cartItems, getTotalAmount, placeOrder, clearCart, user } = useContext(StoreContext);  
//   const [method, setMethod] = useState("cod");  // Default COD
//   const [loading, setLoading] = useState(false);
//   const [deliveryData, setDeliveryData] = useState({
//     firstName: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: ""
//   });

// useEffect(() => {
//   if (user === null) return; // ⛔ wait for check

//   if (!user) {
//     navigate("/");
//   }
// }, [user, navigate]);

//   const deliveryFee = 5;
//   const total = getTotalAmount();

//   React.useEffect(() => {
//     const data = JSON.parse(sessionStorage.getItem('deliveryData') || '{}');
//     if (data.address) {
//       setDeliveryData({
//         firstName: data.firstName || '',
//         phone: data.phone || '',
//         address: data.address || '',
//         city: data.city || '',
//         state: data.state || ''
//       });
//     }
//   }, []);

//   const paymentMethods = [
//     { id: "cod", name: "Cash on Delivery", icon: "💵", desc: "Pay when delivered" },
//     { id: "card", name: "Credit/Debit Card", icon: "💳", desc: "Secure card payment" },
//     { id: "upi", name: "UPI", icon: "📱", desc: "PhonePe, GPay, etc." }
//   ];

//  const handlePayment = async () => {
//   setLoading(true);
  
//   try {
  
// const fullAddress = `${deliveryData.firstName}, ${deliveryData.phone}, ${deliveryData.address}, ${deliveryData.city}, ${deliveryData.state}`;

// const result = await placeOrder(deliveryData, method);

//     if (result.success) {
//       clearCart();
//       navigate("/track-order");
//       return;
//     } else {
//       alert("Order failed. Please try again.");
//     }
//   } catch (error) {
//     alert("Payment failed. Please try again.");
//   } finally {
//     setLoading(false);
//   }
// };

//   const renderPaymentForm = () => {
//     if (method === "cod") {
//       return (
//         <div className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-8 text-center">
//           <div className="text-5xl mb-4">💰</div>
//           <h3 className="text-2xl font-bold text-yellow-800 mb-2">Cash on Delivery</h3>
//           <p className="text-lg text-yellow-700 mb-6">Pay ₹{total.toLocaleString()} when your order arrives</p>
//           <div className="bg-white/50 p-4 rounded-2xl">
//             <p className="font-semibold">Delivery Address:</p>
//             <p className="text-sm">{deliveryData.address}, {deliveryData.city}</p>
//             <p className="text-sm"> {deliveryData.phone}</p>
//           </div>
//         </div>
//       );
//     }
    
//     return (
//       <div className="space-y-4 p-6 bg-blue-50 rounded-3xl">
//         <p className="text-sm text-blue-700 font-medium">
//           {method === 'card' ? 'Enter card details' : 'Enter UPI ID'}
//         </p>
//         <input
//           placeholder={method === 'card' ? 'Card Number **** **** **** 1234' : 'yourupi@pay'}
//           className="w-full p-4 border border-blue-200 rounded-2xl focus:ring-4 focus:ring-blue-200 bg-white"
//         />
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-orange-50 py-20">
//       <div className="max-w-4xl mx-auto px-6">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
//           {/* Payment Selection */}
//           <div className="lg:order-1 mt-20">
//             <div className="bg-white/90 backdrop-blur-xl rounded-4xl p-10 shadow-2xl border border-white/50">
//               <h2 className="text-4xl font-black mb-10 bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
//                 Choose Payment
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//                 {paymentMethods.map(({ id, name, icon, desc }) => (
//                   <button
//                     key={id}
//                     onClick={() => setMethod(id)}
//                     className={`group p-8 rounded-4xl border-4 transition-all hover:shadow-3xl hover:scale-[1.02] flex flex-col items-center gap-4 font-bold h-full ${
//                       method === id
//                         ? "bg-gradient-to-br from-emerald-500 to-green-600 text-white border-emerald-400 shadow-emerald-500/50"
//                         : "bg-white border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
//                     }`}
//                   >
//                     <span className="text-5xl group-hover:scale-110 transition-transform">{icon}</span>
//                     <div>
//                       <div className="text-2xl mb-2">{name}</div>
//                       <div className="text-sm opacity-90">{desc}</div>
//                     </div>
//                   </button>
//                 ))}
//               </div>

//               {renderPaymentForm()}
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="lg:order-2 mt-20">
//             <div className="bg-white/90 backdrop-blur-xl rounded-4xl p-10 shadow-2xl border border-white/50 sticky top-32">
//               <h3 className="text-3xl font-black mb-8 text-gray-900 text-center">Final Summary</h3>
              
//               <div className="space-y-4 mb-8 p-6 bg-gradient-to-b from-emerald-50 to-white rounded-3xl">
//                 {Object.keys(cartItems).map(itemId => {
//                   const item = menuItems.find(i => i._id === itemId);
//                   const qty = cartItems[itemId];
//                   if (!item || !qty) return null;
                  
//                   return (
//                     <div key={itemId} className="flex justify-between items-center py-3">
//                       <div>
//                         <p className="font-bold">{item.name}</p>
//                         <p className="text-sm text-gray-600">×{qty}</p>
//                       </div>
//                       <p className="font-bold text-xl">₹{(item.price * qty).toLocaleString()}</p>
//                     </div>
//                   );
//                 })}
//               </div>

//               <div className="space-y-4 text-2xl mb-8">
//                 <div className="flex justify-between font-bold py-4 border-b border-gray-200">
//                   <span>Subtotal</span>
//                   <span>₹{(total - deliveryFee).toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between text-emerald-600">
//                   <span>Delivery Fee</span>
//                   <span>+ ₹5</span>
//                 </div>
//                 <div className="flex justify-between text-3xl font-black bg-emerald-50 p-6 rounded-3xl">
//                   <span>Total</span>
//                   <span>₹{total.toLocaleString()}</span>
//                 </div>
//               </div>
// <button
//   onClick={handlePayment}
//   disabled={loading}  
//   className={`w-full py-6 px-8 rounded-4xl font-black text-2xl shadow-3xl transition-all flex items-center justify-center gap-4 ${
//     loading
//       ? "bg-gray-400 cursor-not-allowed"
//       : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 hover:shadow-4xl hover:-translate-y-2 text-white"
//   }`}
// >
//   {loading ? (
//     <>
//       <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
//       Placing Order...
//     </>
//   ) : (
//     "🚀 Confirm & Place Order"
//   )}
// </button>
//               <div className="mt-8 pt-8 border-t border-emerald-200 text-center">
//                 <button
//                   onClick={() => navigate("/place-order")}
//                   className="text-emerald-600 hover:text-emerald-700 font-bold text-xl underline"
//                 >
//                   ← Edit Delivery Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;






import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext"; 
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();

  const {
    menuItems,
    cartItems,
    getTotalAmount,
    placeOrder,
    clearCart,
    user
  } = useContext(StoreContext);

  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [deliveryData, setDeliveryData] = useState({});

  useEffect(() => {
    if (user === null) return;
    if (!user) navigate("/");
  }, [user, navigate]);

  // 🔥 GET DATA FROM SESSION
  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("deliveryData") || "{}");
    setDeliveryData(data);
  }, []);

  const deliveryFee = 5;
  const total = getTotalAmount();

  // ✅ FIX 1: ADD THIS (MISSING)
  const paymentMethods = [
    { id: "cod", name: "Cash on Delivery", icon: "💵", desc: "Pay when delivered" },
    { id: "card", name: "Credit/Debit Card", icon: "💳", desc: "Secure card payment" },
    { id: "upi", name: "UPI", icon: "📱", desc: "PhonePe, GPay, etc." }
  ];

  // ✅ FIX 2: ADD THIS (MISSING)
  const renderPaymentForm = () => {
    if (method === "cod") {
      return (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-8 text-center">
          <div className="text-5xl mb-4">💰</div>
          <h3 className="text-2xl font-bold text-yellow-800 mb-2">Cash on Delivery</h3>
          <p className="text-lg text-yellow-700 mb-6">
            Pay ₹{total.toLocaleString()} when your order arrives
          </p>
          <div className="bg-white/50 p-4 rounded-2xl">
            <p className="font-semibold">Delivery Address:</p>
            <p className="text-sm">{deliveryData.address}, {deliveryData.city}</p>
            <p className="text-sm">{deliveryData.phone}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4 p-6 bg-blue-50 rounded-3xl">
        <p className="text-sm text-blue-700 font-medium">
          {method === "card" ? "Enter card details" : "Enter UPI ID"}
        </p>
        <input
          placeholder={method === "card" ? "Card Number **** **** **** 1234" : "yourupi@pay"}
          className="w-full p-4 border border-blue-200 rounded-2xl focus:ring-4 focus:ring-blue-200 bg-white"
        />
      </div>
    );
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      const result = await placeOrder(deliveryData, method);

      if (result.success) {
        clearCart();
        sessionStorage.removeItem("deliveryData");
        navigate("/track-order");
      } else {
        alert(result.msg || "Order failed");
      }

    } catch (error) {
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    // ✅ UI SAME (no change)
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-orange-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Payment Selection */}
          <div className="lg:order-1 mt-20">
            <div className="bg-white/90 backdrop-blur-xl rounded-4xl p-10 shadow-2xl border border-white/50">
              <h2 className="text-4xl font-black mb-10 bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                Choose Payment
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {paymentMethods.map(({ id, name, icon, desc }) => (
                  <button
                    key={id}
                    onClick={() => setMethod(id)}
                    className={`group p-8 rounded-4xl border-4 transition-all hover:shadow-3xl hover:scale-[1.02] flex flex-col items-center gap-4 font-bold h-full ${
                      method === id
                        ? "bg-gradient-to-br from-emerald-500 to-green-600 text-white border-emerald-400 shadow-emerald-500/50"
                        : "bg-white border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    <span className="text-5xl group-hover:scale-110 transition-transform">{icon}</span>
                    <div>
                      <div className="text-2xl mb-2">{name}</div>
                      <div className="text-sm opacity-90">{desc}</div>
                    </div>
                  </button>
                ))}
              </div>

              {renderPaymentForm()}
            </div>
          </div>

          {/* Order Summary (UNCHANGED) */}
          <div className="lg:order-2 mt-20">
            <div className="bg-white/90 backdrop-blur-xl rounded-4xl p-10 shadow-2xl border border-white/50 sticky top-32">
              <h3 className="text-3xl font-black mb-8 text-gray-900 text-center">Final Summary</h3>

              <div className="space-y-4 mb-8 p-6 bg-gradient-to-b from-emerald-50 to-white rounded-3xl">
                {Object.keys(cartItems).map(itemId => {
                  const item = menuItems.find(i => i._id === itemId);
                  const qty = cartItems[itemId];
                  if (!item || !qty) return null;

                  return (
                    <div key={itemId} className="flex justify-between items-center py-3">
                      <div>
                        <p className="font-bold">{item.name}</p>
                        <p className="text-sm text-gray-600">×{qty}</p>
                      </div>
                      <p className="font-bold text-xl">₹{(item.price * qty).toLocaleString()}</p>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-4 text-2xl mb-8">
                <div className="flex justify-between font-bold py-4 border-b border-gray-200">
                  <span>Subtotal</span>
                  <span>₹{(total - deliveryFee).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>Delivery Fee</span>
                  <span>+ ₹5</span>
                </div>
                <div className="flex justify-between text-3xl font-black bg-emerald-50 p-6 rounded-3xl">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className={`w-full py-6 px-8 rounded-4xl font-black text-2xl shadow-3xl transition-all flex items-center justify-center gap-4 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 hover:shadow-4xl hover:-translate-y-2 text-white"
                }`}
              >
                {loading ? "Placing Order..." : "🚀 Confirm & Place Order"}
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Payment;