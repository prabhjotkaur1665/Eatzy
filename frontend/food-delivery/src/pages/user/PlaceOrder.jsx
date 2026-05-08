// import React, { useState, useContext, useEffect  } from "react";
// import { StoreContext } from "../../context/StoreContext"; 
// import { useNavigate } from "react-router-dom";


// const PlaceOrder = () => {
// const { user, menuItems, cartItems, getTotalAmount, placeOrder , fetchUserOrders, clearCart} = useContext(StoreContext);
// const navigate = useNavigate();

// useEffect(() => {
//   if (!user) {
//     navigate("/");
//   }
// }, [user, navigate]);


// const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     country: "India"
//   });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});


//   const deliveryFee = 5;
//   const subtotal = getTotalAmount() - deliveryFee;
//   const total = getTotalAmount();


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
    
//     // Clear error on input
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: ""
//       });
//     }
//   };

// const validateForm = () => {
//   const newErrors = {};

//   if (!formData.firstName?.trim()) {
//     newErrors.firstName = "First name is required";
//   }

//   if (!formData.phone?.trim()) {
//     newErrors.phone = "Phone number is required";
//   } else {
//     const phoneDigits = formData.phone.replace(/\D/g, "");
//     if (phoneDigits.length !== 10) {
//       newErrors.phone = "Phone number must be 10 digits";
//     }
//   }

//   if (!formData.address?.trim()) {
//     newErrors.address = "Address is required";
//   }

//   if (!formData.city?.trim()) {
//     newErrors.city = "City is required";
//   }

//   if (
//     formData.email &&
//     !/^\S+@\S+\.\S+$/.test(formData.email)
//   ) {
//     newErrors.email = "Valid email is required";
//   }

//   setErrors(newErrors);
//   return Object.keys(newErrors).length === 0;
// };

// // const handlePlaceOrder = async () => {
// //   if (!validateForm()) {
// //     alert("Please fix the errors above");
// //     return;
// //   }

// //   sessionStorage.removeItem('deliveryData'); 
  
// //   navigate("/payment");
// // };
// const handlePlaceOrder = async () => {
//   if (!validateForm()) {
//     alert("Please fix the errors above");
//     return;
//   }

//   if (loading) return;
  

//   setLoading(true);

//   try {
//     const res = await placeOrder(formData, "COD");

//     // if (res?.auth === false) {
//     //   navigate("/");
//     //   return;
//     // }

//    if (!res?.success) {
//   console.log("FULL RESPONSE:", res); // 🔥 ADD THIS
//   alert(res?.msg || "Order failed");
//   return;
// }

//     if (res?.success) {
//       clearCart();              // clear cart
//       await fetchUserOrders();  // ✅ fetch updated orders
//       navigate("/payment"); // redirect
//     } else {
//       alert("Order failed");
//     }

//   } catch (err) {
//     console.log(err);
//     alert("Something went wrong");
//   } finally {
//     setLoading(false);
//   }
// };

// const CartItem = ({ itemId }) => {
//   const { menuItems, cartItems } = useContext(StoreContext);  
//   const item = menuItems.find(item => item._id === itemId);
//   const quantity = cartItems[itemId];
  
//   if (!item || !quantity) return null;

//   return (
//     <div className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/30 hover:bg-white/80 transition-all">
//       <img
//         src={item.imageUrl || item.image || "https://via.placeholder.com/80x80?text=Food"}
//         alt={item.name}
//         className="w-20 h-20 object-cover rounded-xl flex-shrink-0 shadow-lg"
//       />
//       <div className="flex-1 min-w-0">
//         <h4 className="font-bold text-lg text-gray-900 truncate">{item.name}</h4>
//         <p className="text-sm text-gray-600 mb-1">₹{item.price.toLocaleString()}</p>
//         <p className="text-sm font-semibold text-orange-600">Qty: {quantity}</p>
//       </div>
//       <div className="text-right">
//         <p className="font-bold text-xl text-gray-900">
//           ₹{(item.price * quantity).toLocaleString()}
//         </p>
//       </div>
//     </div>
//   );
// };

//   return (
//     <div className="max-w-6xl mx-auto mt-20 px-4 py-12 bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 min-h-screen">
//       {/* Header */}
//       <div className="text-center mb-20">
//         <h1 className="text-6xl font-black bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
//           Checkout
//         </h1>
//         <div className="flex items-center justify-center gap-4 text-xl text-gray-600 max-w-2xl mx-auto">
//           <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
//             1
//           </div>
//           <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
//           <div className="w-12 h-12 bg-gray-300 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
//             2
//           </div>
//           <span>Delivery Details</span>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
//         {/* Delivery Form */}
//         <div className="space-y-8 lg:max-w-2xl">
//           <div className="bg-white/80 backdrop-blur-xl rounded-4xl p-10 shadow-2xl border border-white/50">
//             <h2 className="text-4xl font-black mb-8 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
//               Delivery Details
//             </h2>
            
//             {/* Name Row */}
//             <div className="grid grid-cols-2 gap-4 mb-8">
//               <div>
//                 <input
//                   name="firstName"
//                   placeholder="First Name *"
//                   value={formData.firstName}
//                   onChange={handleInputChange}
//                   className={`w-full p-6 border-2 rounded-3xl text-lg font-semibold transition-all focus:outline-none ${
//                     errors.firstName 
//                       ? "border-red-300 bg-red-50 focus:ring-red-200" 
//                       : "border-gray-200 hover:border-orange-300 focus:ring-4 focus:ring-orange-200 focus:border-orange-500"
//                   }`}
//                 />
//                 {errors.firstName && (
//                   <p className="text-red-500 text-sm mt-1 ml-1">{errors.firstName}</p>
//                 )}
//               </div>
//               <div>
//                 <input
//                   name="lastName"
//                   placeholder="Last Name"
//                   value={formData.lastName}
//                   onChange={handleInputChange}
//                   className="w-full p-6 border-2 border-gray-200 rounded-3xl hover:border-orange-300 focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all text-lg font-semibold focus:outline-none"
//                 />
//               </div>
//             </div>

//             {/* Contact Row */}
//             <div className="grid grid-cols-2 gap-4 mb-8">
//               <div>
//                 <input
//                   name="email"
//                   type="email"
//                   placeholder="Email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className={`w-full p-6 border-2 rounded-3xl text-lg font-semibold transition-all focus:outline-none ${
//                     errors.email 
//                       ? "border-red-300 bg-red-50 focus:ring-red-200" 
//                       : "border-gray-200 hover:border-orange-300 focus:ring-4 focus:ring-orange-200 focus:border-orange-500"
//                   }`}
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>
//                 )}
//               </div>
//               <div>
//                 <input
//                   name="phone"
//                   type="tel"
//                   placeholder="Phone Number * (+91)"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   className={`w-full p-6 border-2 rounded-3xl text-lg font-semibold transition-all focus:outline-none ${
//                     errors.phone 
//                       ? "border-red-300 bg-red-50 focus:ring-red-200" 
//                       : "border-gray-200 hover:border-orange-300 focus:ring-4 focus:ring-orange-200 focus:border-orange-500"
//                   }`}
//                 />
//                 {errors.phone && (
//                   <p className="text-red-500 text-sm mt-1 ml-1">{errors.phone}</p>
//                 )}
//               </div>
//             </div>

//             {/* Address */}
//             <div className="mb-8">
//               <textarea
//                 name="address"
//                 placeholder="Street Address * (House No, Street, Landmark)"
//                 rows={4}
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 className={`w-full p-6 border-2 rounded-3xl text-lg font-semibold resize-vertical focus:outline-none transition-all ${
//                   errors.address 
//                     ? "border-red-300 bg-red-50 focus:ring-red-200" 
//                     : "border-gray-200 hover:border-orange-300 focus:ring-4 focus:ring-orange-200 focus:border-orange-500"
//                 }`}
//               />
//               {errors.address && (
//                 <p className="text-red-500 text-sm mt-1 ml-1">{errors.address}</p>
//               )}
//             </div>

//             {/* Location Row */}
//             <div className="grid grid-cols-2 gap-4 mb-8">
//               <div>
//                 <input
//                   name="city"
//                   placeholder="City *"
//                   value={formData.city}
//                   onChange={handleInputChange}
//                   className={`w-full p-6 border-2 rounded-3xl text-lg font-semibold transition-all focus:outline-none ${
//                     errors.city 
//                       ? "border-red-300 bg-red-50 focus:ring-red-200" 
//                       : "border-gray-200 hover:border-orange-300 focus:ring-4 focus:ring-orange-200 focus:border-orange-500"
//                   }`}
//                 />
//                 {errors.city && (
//                   <p className="text-red-500 text-sm mt-1 ml-1">{errors.city}</p>
//                 )}
//               </div>
//               <div>
//                 <input
//                   name="state"
//                   placeholder="State"
//                   value={formData.state}
//                   onChange={handleInputChange}
//                   className="w-full p-6 border-2 border-gray-200 rounded-3xl hover:border-orange-300 focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all text-lg font-semibold focus:outline-none"
//                 />
//               </div>
//             </div>

//             {/* ZIP & Country */}
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 name="zipCode"
//                 placeholder="ZIP / PIN Code"
//                 value={formData.zipCode}
//                 onChange={handleInputChange}
//                 className="w-full p-6 border-2 border-gray-200 rounded-3xl hover:border-orange-300 focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all text-lg font-semibold focus:outline-none"
//               />
//               <input
//                 name="country"
//                 placeholder="Country"
//                 value={formData.country}
//                 className="w-full p-6 border-2 border-gray-300 rounded-3xl bg-gray-50 text-gray-600 font-semibold cursor-not-allowed text-lg"
//                 disabled
//               />
//             </div>
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div className="lg:sticky lg:top-24 space-y-8">
//           {/* Items List */}
//           <div className="bg-white/80 backdrop-blur-xl rounded-4xl p-8 shadow-2xl border border-white/50">
//             <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
//               <div className="w-8 h-8 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
//                 🛒
//               </div>
//               Cart Items ({Object.keys(cartItems).length})
//             </h3>
            
//             <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
//               {Object.keys(cartItems).map((itemId) => (
//                 <CartItem key={itemId} itemId={itemId} />
//               ))}
//             </div>
//           </div>

//           {/* Price Summary */}
//           <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-4xl p-10 shadow-2xl border border-orange-100">
//             <h3 className="text-2xl font-bold mb-8 text-gray-900 text-center">
//               Order Summary
//             </h3>
            
//             <div className="space-y-4 text-xl mb-8">
//               <div className="flex justify-between items-center py-3 border-b border-orange-100">
//                 <span className="font-semibold">Subtotal</span>
//                 <span className="font-bold text-gray-900">₹{subtotal.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between items-center py-3 border-b border-orange-100">
//                 <span className="font-semibold text-orange-600">Delivery Fee</span>
//                 <span className="font-bold text-orange-600">₹{deliveryFee}</span>
//               </div>
//               <div className="flex justify-between items-center pt-4 border-t-2 border-orange-300 bg-white/50 rounded-2xl p-4 shadow-inner">
//                 <span className="text-2xl font-black text-gray-900">Total Amount</span>
//                 <span className="text-3xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
//                   ₹{total.toLocaleString()}
//                 </span>
//               </div>
//             </div>

//             {/* CTA Button */}
//             <button
//             type="button"
//               onClick={handlePlaceOrder}
//               disabled={loading || Object.keys(errors).length > 0}
//               className={`w-full py-6 px-8 rounded-4xl font-black text-xl shadow-3xl transition-all transform flex items-center justify-center gap-4 group ${
//                 loading
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:shadow-4xl hover:-translate-y-2 active:scale-95"
//               }`}
//             >
//               {loading ? (
//                 <>
//                   <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
//                   <span>Processing...</span>
//                 </>
//               ) : (
//                 <>
//                   <span>Proceed to Payment</span>
//                   <div className="w-6 h-6 bg-white/30 rounded-full group-hover:scale-110 transition-transform"></div>
//                 </>
//               )}
//             </button>

//             {/* Save for Later */}
//             <div className="mt-8 pt-8 border-t border-orange-200 text-center">
//               <button
//                 onClick={() => navigate("/cart")}
//                 className="text-orange-600 hover:text-orange-700 font-semibold text-lg transition-colors"
//               >
//                 ← Back to Cart
//               </button>
//             </div>
//           </div>

//           {/* Delivery Info */}
//           <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-8 text-center">
//             <div className="text-4xl mb-4">⚡</div>
//             <h4 className="text-xl font-bold text-emerald-800 mb-2">Lightning Fast Delivery</h4>
//             <p className="text-emerald-700">Get your order delivered in 25-45 minutes 🚚</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // CartItem Component (moved inside for simplicity)
// // const CartItem = ({ itemId }) => {
// //   const { menuItems, cartItems } = useContext(StoreContext);
// //   const item = menuItems.find(item => item._id === itemId);
// //   const quantity = cartItems[itemId];
  
// //   if (!item || !quantity) return null;

// //   return (
// //     <div className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/30 hover:bg-white/80 transition-all">
// //       <img
// //         src={item.imageUrl || item.image || "https://via.placeholder.com/80x80?text=Food"}
// //         alt={item.name}
// //         className="w-20 h-20 object-cover rounded-xl flex-shrink-0 shadow-lg"
// //       />
// //       <div className="flex-1 min-w-0">
// //         <h4 className="font-bold text-lg text-gray-900 truncate">{item.name}</h4>
// //         <p className="text-sm text-gray-600 mb-1">₹{item.price.toLocaleString()}</p>
// //         <p className="text-sm font-semibold text-orange-600">Qty: {quantity}</p>
// //       </div>
// //       <div className="text-right">
// //         <p className="font-bold text-xl text-gray-900">
// //           ₹{(item.price * quantity).toLocaleString()}
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// export default PlaceOrder;











import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext"; 
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { user, menuItems, cartItems, getTotalAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India"
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const deliveryFee = 5;
  const subtotal = getTotalAmount() - deliveryFee;
  const total = getTotalAmount();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName?.trim()) newErrors.firstName = "First name is required";
    if (!formData.phone?.trim()) newErrors.phone = "Phone number is required";
    else if (formData.phone.replace(/\D/g, "").length !== 10)
      newErrors.phone = "Phone number must be 10 digits";

    if (!formData.address?.trim()) newErrors.address = "Address is required";
    if (!formData.city?.trim()) newErrors.city = "City is required";

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Valid email is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      alert("Please fix the errors above");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      // 🔥 IMPORTANT FIX: Save data for payment page
      sessionStorage.setItem("deliveryData", JSON.stringify(formData));

      // 👉 No API call here
      navigate("/payment");

    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const CartItem = ({ itemId }) => {
    const item = menuItems.find(item => item._id === itemId);
    const quantity = cartItems[itemId];

    if (!item || !quantity) return null;

  return (
    <div className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/30 hover:bg-white/80 transition-all">
      <img
        src={item.imageUrl || item.image || "https://via.placeholder.com/80x80?text=Food"}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-xl flex-shrink-0 shadow-lg"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-lg text-gray-900 truncate">{item.name}</h4>
        <p className="text-sm text-gray-600 mb-1">₹{item.price.toLocaleString()}</p>
        <p className="text-sm font-semibold text-orange-600">Qty: {quantity}</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-xl text-gray-900">
          ₹{(item.price * quantity).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4 py-12 bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-20">
        <h1 className="text-6xl font-black bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
          Checkout
        </h1>
        <div className="flex items-center justify-center gap-4 text-xl text-gray-600 max-w-2xl mx-auto">
          <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
            1
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
          <div className="w-12 h-12 bg-gray-300 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
            2
          </div>
          <span>Delivery Details</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Delivery Form */}
        <div className="space-y-8 lg:max-w-2xl">
          <div className="bg-white/80 backdrop-blur-xl rounded-4xl p-10 shadow-2xl border border-white/50">
            <h2 className="text-4xl font-black mb-8 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Delivery Details
            </h2>
            
            {/* Name Row */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <input
                  name="firstName"
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full p-6 border-2 rounded-3xl text-lg font-semibold transition-all focus:outline-none ${
                    errors.firstName 
                      ? "border-red-300 bg-red-50 focus:ring-red-200" 
                      : "border-gray-200 hover:border-orange-300 focus:ring-4 focus:ring-orange-200 focus:border-orange-500"
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1 ml-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-6 border-2 border-gray-200 rounded-3xl hover:border-orange-300 focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all text-lg font-semibold focus:outline-none"
                />
              </div>
            </div>

            {/* Contact Row */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full p-6 border-2 rounded-3xl text-lg font-semibold transition-all focus:outline-none ${
                    errors.email 
                      ? "border-red-300 bg-red-50 focus:ring-red-200" 
                      : "border-gray-200 hover:border-orange-300 focus:ring-4 focus:ring-orange-200 focus:border-orange-500"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>
                )}
              </div>
              <div>
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number * (+91)"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full p-6 border-2 rounded-3xl text-lg font-semibold transition-all focus:outline-none ${
                    errors.phone 
                      ? "border-red-300 bg-red-50 focus:ring-red-200" 
                      : "border-gray-200 hover:border-orange-300 focus:ring-4 focus:ring-orange-200 focus:border-orange-500"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 ml-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="mb-8">
              <textarea
                name="address"
                placeholder="Street Address * (House No, Street, Landmark)"
                rows={4}
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full p-6 border-2 rounded-3xl text-lg font-semibold resize-vertical focus:outline-none transition-all ${
                  errors.address 
                    ? "border-red-300 bg-red-50 focus:ring-red-200" 
                    : "border-gray-200 hover:border-orange-300 focus:ring-4 focus:ring-orange-200 focus:border-orange-500"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1 ml-1">{errors.address}</p>
              )}
            </div>

            {/* Location Row */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <input
                  name="city"
                  placeholder="City *"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full p-6 border-2 rounded-3xl text-lg font-semibold transition-all focus:outline-none ${
                    errors.city 
                      ? "border-red-300 bg-red-50 focus:ring-red-200" 
                      : "border-gray-200 hover:border-orange-300 focus:ring-4 focus:ring-orange-200 focus:border-orange-500"
                  }`}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1 ml-1">{errors.city}</p>
                )}
              </div>
              <div>
                <input
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full p-6 border-2 border-gray-200 rounded-3xl hover:border-orange-300 focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all text-lg font-semibold focus:outline-none"
                />
              </div>
            </div>

            {/* ZIP & Country */}
            <div className="grid grid-cols-2 gap-4">
              <input
                name="zipCode"
                placeholder="ZIP / PIN Code"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full p-6 border-2 border-gray-200 rounded-3xl hover:border-orange-300 focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all text-lg font-semibold focus:outline-none"
              />
              <input
                name="country"
                placeholder="Country"
                value={formData.country}
                className="w-full p-6 border-2 border-gray-300 rounded-3xl bg-gray-50 text-gray-600 font-semibold cursor-not-allowed text-lg"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-24 space-y-8">
          {/* Items List */}
          <div className="bg-white/80 backdrop-blur-xl rounded-4xl p-8 shadow-2xl border border-white/50">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                🛒
              </div>
              Cart Items ({Object.keys(cartItems).length})
            </h3>
            
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {Object.keys(cartItems).map((itemId) => (
                <CartItem key={itemId} itemId={itemId} />
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-4xl p-10 shadow-2xl border border-orange-100">
            <h3 className="text-2xl font-bold mb-8 text-gray-900 text-center">
              Order Summary
            </h3>
            
            <div className="space-y-4 text-xl mb-8">
              <div className="flex justify-between items-center py-3 border-b border-orange-100">
                <span className="font-semibold">Subtotal</span>
                <span className="font-bold text-gray-900">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-orange-100">
                <span className="font-semibold text-orange-600">Delivery Fee</span>
                <span className="font-bold text-orange-600">₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t-2 border-orange-300 bg-white/50 rounded-2xl p-4 shadow-inner">
                <span className="text-2xl font-black text-gray-900">Total Amount</span>
                <span className="text-3xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
                  ₹{total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <button
            type="button"
              onClick={handlePlaceOrder}
              disabled={loading || Object.keys(errors).length > 0}
              className={`w-full py-6 px-8 rounded-4xl font-black text-xl shadow-3xl transition-all transform flex items-center justify-center gap-4 group ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:shadow-4xl hover:-translate-y-2 active:scale-95"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Proceed to Payment</span>
                  <div className="w-6 h-6 bg-white/30 rounded-full group-hover:scale-110 transition-transform"></div>
                </>
              )}
            </button>

            {/* Save for Later */}
            <div className="mt-8 pt-8 border-t border-orange-200 text-center">
              <button
                onClick={() => navigate("/cart")}
                className="text-orange-600 hover:text-orange-700 font-semibold text-lg transition-colors"
              >
                ← Back to Cart
              </button>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-8 text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="text-xl font-bold text-emerald-800 mb-2">Lightning Fast Delivery</h4>
            <p className="text-emerald-700">Get your order delivered in 25-45 minutes 🚚</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;






