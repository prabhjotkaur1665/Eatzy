// import React, { useState, useEffect, useContext } from "react";
// import { StoreContext } from "../../context/StoreContext"; 
// import { useNavigate } from "react-router-dom";

// const TrackOrder = () => {
//   const navigate = useNavigate();
// const { orders = [], menuItems = [], fetchUserOrders } = useContext(StoreContext);  
// const [currentOrder, setCurrentOrder] = useState(null);

// useEffect(() => {
//   const loadOrders = async () => {
//     await fetchUserOrders();   // ✅ pehle orders lao
//   };

//   loadOrders();
// }, []);

// useEffect(() => {
//   if (orders && orders.length > 0) {
//     setCurrentOrder(orders[0]);
//   }
// }, [orders]);


//   if (!currentOrder) {
//     return (
//       <div className="min-h-screen flex items-center justify-center py-20">
//         <div className="text-center">
//           <div className="w-32 h-32 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
//             <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>
//           <h2 className="text-3xl font-bold mb-4">No Active Orders</h2>
//           <button
//             onClick={() => navigate("/menu")}
//             className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-3xl font-bold text-xl"
//           >
//             Order Now
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const orderStatusStages = [
//     { name: "Order Placed", completed: true, color: "emerald" },
//     { name: "Processing", completed: true, color: "yellow" },
//     { name: "Out for Delivery", completed: false, color: "orange" },
//     { name: "Delivered", completed: false, color: "gray" }
//   ];

//   const calculateItemsTotal = () => {
//     return currentOrder.items.reduce((total, orderItem) => {
//       const menuItem = menuItems.find(item => item._id === orderItem.itemId);
//       return total + (menuItem?.price * orderItem.quantity || 0);
//     }, 0);
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-20 px-4 py-12">
//       {/* Header */}
//       <div className="text-center mb-16">
//         <h1 className="text-5xl font-black bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent mt-10 mb-4">
//           Track Order
//         </h1>
//         <div className="bg-white rounded-2xl p-6 shadow-xl inline-flex items-center gap-4">
//           <span className="font-mono font-bold text-2xl text-emerald-600">#{currentOrder._id?.slice(-8)}</span>
//           <span className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold">
//             Processing
//           </span>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
//         {/* Order Items */}
//         <div className="space-y-6">
//   <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
//     <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
//       Order Items 
//       <span className="text-sm bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
//         {currentOrder?.items?.length || 0} items
//       </span>
//     </h2>
    
//     {/* ✅ Debug + Fallback */}
//     {currentOrder?.items && currentOrder.items.length > 0 ? (
//       currentOrder.items.map((orderItem, index) => {
//         // ✅ Find menu item with fallback
//         const menuItem = menuItems.find(item => item._id === orderItem.itemId) || {
//           name: "Item Unavailable",
//           price: 0,
//           image: "https://via.placeholder.com/80x80?text=No+Image"
//         };

//         return (
//           <div key={orderItem.itemId || index} className="flex items-center gap-6 p-6 bg-gradient-to-r from-gray-50 to-white rounded-3xl mb-4 shadow-sm border hover:shadow-md transition-all">
//             <img
//               src={menuItem.imageUrl || menuItem.image}
//               alt={menuItem.name}
//               className="w-24 h-24 object-cover rounded-2xl shadow-lg flex-shrink-0"
//               onError={(e) => {
//                 e.target.src = "https://via.placeholder.com/96x96?text=🍕";
//               }}
//             />
//             <div className="flex-1 min-w-0">
//               <h3 className="font-black text-xl mb-2 text-gray-900 truncate pr-4">
//                 {menuItem.name}
//               </h3>
//               <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
//                 <span>Qty: <span className="font-bold text-orange-600">{orderItem.quantity}</span></span>
//                 <span>₹{menuItem.price?.toLocaleString() || '0'} × {orderItem.quantity}</span>
//               </div>
//               <p className="text-2xl font-black text-orange-500">
//                 ₹{(menuItem.price * orderItem.quantity || 0).toLocaleString()}
//               </p>
//             </div>
//           </div>
//         );
//       })
//     ) : (
//       // ✅ Empty State
//       <div className="text-center py-16">
//         <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
//           <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-4V7m8 10v3m0 0l-8-4m8 4l-8 4" />
//           </svg>
//         </div>
//         <h3 className="text-2xl font-bold text-gray-700 mb-2">No Items Found</h3>
//         <p className="text-gray-500 mb-6">Order items will appear here</p>
//         <button
//           onClick={() => navigate("/menu")}
//           className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-xl transition-all"
//         >
//           Add More Items
//         </button>
//       </div>
//     )}
//   </div>
// </div>

//         {/* Price Details */}
//         <div>
//           <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 sticky top-24">
//             <h3 className="text-2xl font-bold mb-6">Payment Summary</h3>
//             <div className="space-y-4 text-lg">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>₹{calculateItemsTotal().toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between pt-4 border-t">
//                 <span className="font-bold">Delivery Fee</span>
//                 <span className="font-bold">₹5</span>
//               </div>
//               <div className="flex justify-between text-2xl font-black text-emerald-600 pt-4 border-t border-emerald-200">
//                 <span>Total</span>
//                 <span>₹{currentOrder.total?.toLocaleString()}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Progress Tracker */}
//       <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
//         <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
//           Delivery Progress
//         </h2>
        
//         <div className="max-w-4xl mx-auto">
//           <div className="relative">
//             {/* Steps */}
//             <div className="flex items-center justify-between mb-2">
//               {orderStatusStages.map((stage, index) => (
//                 <div key={index} className="flex flex-col items-center z-10 relative">
//                   <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-xl font-bold shadow-2xl transition-all ${
//                     stage.completed 
//                       ? `bg-gradient-to-r from-${stage.color}-500 to-${stage.color}-600 text-white shadow-${stage.color}-500/50`
//                       : 'bg-gray-200 text-gray-500'
//                   }`}>
//                     {index + 1}
//                   </div>
//                   <p className="text-sm mt-3 font-semibold text-gray-700">{stage.name}</p>
//                 </div>
//               ))}
//             </div>
            
//             {/* Progress Line */}
//             <div className="absolute inset-0 flex items-center">
//               <div className="flex-1 h-1 bg-gradient-to-r from-emerald-500 to-yellow-500 rounded-full mx-10"></div>
//               <div className="flex-1 h-1 bg-gray-300 rounded-full mx-10"></div>
//               <div className="flex-1 h-1 bg-gray-300 rounded-full mx-10"></div>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 mt-16 pt-12 border-t border-gray-200">
//           <button
//             onClick={() => navigate("/menu")}
//             className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-5 px-8 rounded-3xl font-bold text-xl hover:shadow-3xl transition-all flex items-center justify-center gap-3"
//           >
//              Explore More
//           </button>
//           <button
//             onClick={() => navigate("/your-orders")}
//             className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-5 px-8 rounded-3xl font-bold text-xl hover:shadow-3xl transition-all"
//           >
//             View All Orders
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrackOrder;










import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../context/StoreContext"; 
import { useNavigate } from "react-router-dom";

const TrackOrder = () => {
  const navigate = useNavigate();

  const { orders = [], menuItems = [], fetchUserOrders } = useContext(StoreContext);  

  const [currentOrder, setCurrentOrder] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      setLoadingOrders(true);
      await fetchUserOrders();
      setLoadingOrders(false);
    };

    loadOrders();
  }, []);

  useEffect(() => {
    if (orders && orders.length > 0) {
setCurrentOrder(orders[0]);  
  }
  }, [orders]);

  if (loadingOrders) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="text-xl font-bold">Loading orders...</div>
      </div>
    );
  }
  

  if (!currentOrder || !currentOrder.items) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-32 h-32 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">No Active Orders</h2>
          <button
            onClick={() => navigate("/menu")}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-3xl font-bold text-xl"
          >
            Order Now
          </button>
        </div>
      </div>
    );
  }

  const orderStatusStages = [
    { name: "Order Placed", completed: true },
    { name: "Processing", completed: true },
    { name: "Out for Delivery", completed: false },
    { name: "Delivered", completed: false }
  ];

  const calculateItemsTotal = () => {
    return currentOrder.items.reduce((total, orderItem) => {
const menuItem = menuItems.find(item => item._id === orderItem.itemId);
      return total + (menuItem?.price * orderItem.quantity || 0);
    }, 0);
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent mt-10 mb-4">
          Track Order
        </h1>
        <div className="bg-white rounded-2xl p-6 shadow-xl inline-flex items-center gap-4">
          <span className="font-mono font-bold text-2xl text-emerald-600">
            #{currentOrder._id?.slice(-8)}
          </span>
          <span className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold">
            Processing
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              Order Items 
              <span className="text-sm bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                {currentOrder.items.length} items
              </span>
            </h2>

            {currentOrder.items.map((orderItem, index) => {
             const menuItem = menuItems.find(item => item._id === orderItem.itemId) || {
                name: "Item Unavailable",
                price: 0,
                image: "https://via.placeholder.com/80x80?text=No+Image"
              };

              return (
                <div key={orderItem.itemId || index} className="flex items-center gap-6 p-6 bg-gradient-to-r from-gray-50 to-white rounded-3xl mb-4 shadow-sm border">
                  <img
                    src={menuItem.imageUrl || menuItem.image}
                    alt={menuItem.name}
                    className="w-24 h-24 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-black text-xl mb-2 text-gray-900">
                      {menuItem.name}
                    </h3>
                    <div className="text-sm text-gray-600 mb-2">
                      Qty: {orderItem.quantity}
                    </div>
                    <p className="text-2xl font-black text-orange-500">
                      ₹{(menuItem.price * orderItem.quantity || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 sticky top-24">
            <h3 className="text-2xl font-bold mb-6">Payment Summary</h3>
            <div className="space-y-4 text-lg">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{calculateItemsTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-4 border-t">
                <span className="font-bold">Delivery Fee</span>
                <span className="font-bold">₹5</span>
              </div>
              <div className="flex justify-between text-2xl font-black text-emerald-600 pt-4 border-t border-emerald-200">
                <span>Total</span>
                <span>₹{currentOrder.total?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12">
          Delivery Progress
        </h2>

        <div className="flex justify-between">
          {orderStatusStages.map((stage, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                stage.completed ? "bg-green-500 text-white" : "bg-gray-200"
              }`}>
                {index + 1}
              </div>
              <p className="mt-2 text-sm">{stage.name}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-12">
          <button
            onClick={() => navigate("/menu")}
            className="flex-1 bg-orange-500 text-white py-4 rounded-2xl font-bold"
          >
            Explore More
          </button>
          <button
            onClick={() => navigate("/your-orders")}
            className="flex-1 bg-green-500 text-white py-4 rounded-2xl font-bold"
          >
            View All Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;