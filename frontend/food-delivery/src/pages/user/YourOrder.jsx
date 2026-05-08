// import React, { useContext, useEffect, useState } from "react";
// import { StoreContext } from "../../context/StoreContext"; 
// import { useNavigate } from "react-router-dom";

// const YourOrders = () => {
//   const { orders, fetchUserOrders, menuItems } = useContext(StoreContext);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchUserOrders();
//   }, [fetchUserOrders]);

//   const getStatusColor = (status) => {
//     switch(status?.toLowerCase()) {
//       case 'delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
//       case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
//       case 'processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//       case 'out for delivery': return 'bg-orange-100 text-orange-800 border-orange-200';
//       default: return 'bg-blue-100 text-blue-800 border-blue-200';
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       weekday: 'short',
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const calculateOrderTotal = (orderItems) => {
//     return orderItems.reduce((total, orderItem) => {
//       const menuItem = menuItems.find(item => item._id === orderItem.itemId);
//       return total + (menuItem?.price * orderItem.quantity || 0);
//     }, 0);
//   };

//   const trackOrder = (orderId) => {
//     navigate(`/track-order/${orderId}`);
//   };

//   if (loading || orders.length === 0) {
//     return (
//       <div className="min-h-screen py-20 px-4">
//         <div className="max-w-4xl mx-auto text-center">
//           <div className="w-32 h-32 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse">
//             <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
//             </svg>
//           </div>
//           <h2 className="text-3xl font-bold text-gray-800 mb-4">
//             {loading ? "Loading your orders..." : "No orders found"}
//           </h2>
//           <p className="text-xl text-gray-600 mb-8">
//             {loading ? "Just a moment..." : "Start ordering to see your history here"}
//           </p>
//           {!loading && (
//             <button
//               onClick={() => navigate("/menu")}
//               className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-12 py-5 rounded-3xl font-bold text-xl hover:shadow-3xl transition-all"
//             >
//               Start Ordering →
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 to-orange-50">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-20">
//           <h1 className="text-5xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
//             Your Orders
//           </h1>
//           <p className="text-2xl text-gray-600">
//             {orders.length} {orders.length === 1 ? 'order' : 'orders'} in your history
//           </p>
//         </div>

//         {/* Orders Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
//           {orders.map((order, index) => (
//             <div key={order._id || index} className="group bg-white rounded-4xl shadow-2xl hover:shadow-4xl transition-all overflow-hidden border border-gray-100 hover:-translate-y-2 hover:border-orange-200">
              
//               {/* Header */}
//               <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white relative overflow-hidden">
//                 <div className="absolute inset-0 bg-black/10" />
//                 <div className="relative z-10">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl text-sm font-bold mb-2">
//                         #{order._id?.slice(-8).toUpperCase() || `ORD-${index + 1}`}
//                       </span>
//                       <h3 className="text-2xl font-black">{formatDate(order.createdAt)}</h3>
//                     </div>
//                     <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
//                       {order.status || 'Processing'}
//                     </span>
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3 text-lg">
//                       <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
//                       <span>{order.items?.length || 0} items</span>
//                     </div>
//                     <div className="text-3xl font-black">
//                       ₹{(order.total || calculateOrderTotal(order.items)).toLocaleString()}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Items Preview */}
//               <div className="p-8">
//                 <h4 className="font-bold text-xl mb-6 pb-4 border-b">Items Ordered</h4>
//                 <div className="space-y-3 mb-8 max-h-48 overflow-y-auto">
//                   {order.items.slice(0, 3).map((orderItem, itemIndex) => {
//                     const menuItem = menuItems.find(item => item._id === orderItem.itemId);
//                     if (!menuItem) return null;

//                     return (
//                       <div key={itemIndex} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl group-hover:bg-orange-50 transition-colors">
//                         <img
//                           src={menuItem.imageUrl || menuItem.image}
//                           alt={menuItem.name}
//                           className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
//                         />
//                         <div className="flex-1 min-w-0">
//                           <p className="font-semibold text-lg truncate">{menuItem.name}</p>
//                           <p className="text-sm text-gray-600">Qty: {orderItem.quantity}</p>
//                         </div>
//                         <div className="text-right">
//                           <p className="font-bold text-orange-500">
//                             ₹{(menuItem.price * orderItem.quantity).toLocaleString()}
//                           </p>
//                         </div>
//                       </div>
//                     );
//                   })}
//                   {order.items.length > 3 && (
//                     <p className="text-center text-gray-500 py-4">
//                       +{order.items.length - 3} more items
//                     </p>
//                   )}
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-4 pt-6 border-t">
//                   <button
//                     onClick={() => trackOrder(order._id)}
//                     className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 px-6 rounded-3xl font-bold text-lg hover:shadow-3xl transition-all flex items-center justify-center gap-3 hover:-translate-y-1"
//                   >
//                     Track Order
//                   </button>
//                   <button
//                     onClick={() => navigate("/menu")}
//                     className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-3xl font-bold text-lg hover:shadow-3xl transition-all flex items-center justify-center gap-3 hover:-translate-y-1"
//                   >
//                     Order Again
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty State Alternative */}
//         {orders.length === 0 && !loading && (
//           <div className="col-span-full text-center py-32">
//             <div className="w-40 h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-4xl flex items-center justify-center mx-auto mb-12 p-8">
//               <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//               </svg>
//             </div>
//             <h2 className="text-4xl font-black text-gray-800 mb-6">No Orders Yet</h2>
//             <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
//               Your order history will appear here once you place your first order.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button
//                 onClick={() => navigate("/menu")}
//                 className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-12 py-5 rounded-3xl font-bold text-xl hover:shadow-3xl transition-all"
//               >
//                  Browse Menu
//               </button>
//               <button
//                 onClick={() => navigate("/cart")}
//                 className="border-4 border-gray-300 text-gray-700 px-12 py-5 rounded-3xl font-bold text-xl hover:bg-gray-50 transition-all hover:shadow-xl"
//               >
//                 View Cart
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default YourOrders;












import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext"; 
import { useNavigate } from "react-router-dom";

const YourOrders = () => {
const { orders = [], fetchUserOrders, menuItems = [] } = useContext(StoreContext);  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserOrders();
  }, [fetchUserOrders]);

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'out for delivery': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateOrderTotal = (orderItems) => {
    return orderItems.reduce((total, orderItem) => {
      const menuItem = menuItems.find(item => item._id === orderItem.itemId);
      return total + (menuItem?.price * orderItem.quantity || 0);
    }, 0);
  };

  const trackOrder = () => {
    navigate("/track-order");  
  };

  if (loading || orders.length === 0) {
    
    return (
      <div className="min-h-screen py-16 px-4 flex items-center justify-center">
        <div className="max-w-md text-center space-y-6">
          <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {loading ? "Loading orders..." : "No orders yet"}
          </h2>
          <p className="text-gray-600">
            {loading ? "Please wait..." : "Place your first order!"}
          </p>
          {!loading && (
            <button
              onClick={() => navigate("/menu")}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all w-full max-w-xs mx-auto"
            >
              Order Now
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-slate-50/50 to-orange-50/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-800 via-gray-700 to-slate-800 bg-clip-text text-transparent mb-3 mt-10">
            Your Orders
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            {orders.length} order{orders.length !== 1 ? 's' : ''} in history
          </p>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
            <article key={order._id || index} className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 hover:border-orange-200 hover:-translate-y-2 hover:scale-[1.02]">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      {/* <span className="inline-block bg-white/25 backdrop-blur-sm px-3 py-1 rounded-xl text-xs font-bold tracking-wide">
                        #{order._id?.slice(-6).toUpperCase() || `ORD-${index + 1}`}
                      </span> */}
                      <time className="text-lg font-bold block">
                        {formatDate(order.createdAt)}
                      </time>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(order.status)}`}>
                      {order.status || 'Processing'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-sm bg-white/10 px-3 py-1 rounded-xl backdrop-blur-sm">
                      <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                      <span>{order.items?.length || 0} items</span>
                    </div>
                    <div className="text-2xl font-black drop-shadow-lg">
                      ₹{(order.total || 0).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Items Preview */}
                <div className="mb-6">
                  <h4 className="font-bold text-base mb-4 pb-2 border-b border-gray-200 text-gray-800 flex items-center gap-2">
                    Items 
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                      {order.items?.length || 0}
                    </span>
                  </h4>
                  
                  <div className="space-y-2 max-h-28 overflow-hidden">
                    {order.items?.slice(0, 2).map((orderItem, itemIndex) => {
                      const menuItem = menuItems.find(item => item._id === orderItem.itemId);
                      if (!menuItem) return null;

                      return (
                        <div key={itemIndex} className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-orange-50/50 rounded-xl group-hover:from-orange-50 group-hover:to-orange-100 transition-all border hover:border-orange-200 hover:shadow-sm">
                          <img
                            src={menuItem.imageUrl || menuItem.image || "https://via.placeholder.com/48x48?text=🍕"}
                            alt={menuItem.name}
                            className="w-12 h-12 object-cover rounded-xl flex-shrink-0 shadow-md"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate text-gray-900 pr-2">
                              {menuItem.name}
                            </p>
                            <p className="text-xs text-gray-600">Qty: {orderItem.quantity}</p>
                          </div>
                          <div className="text-right min-w-[60px]">
                            <p className="font-bold text-orange-600 text-sm">
                              ₹{(menuItem.price * orderItem.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      );
                    }) || (
                      <div className="text-center py-4 text-gray-500 text-sm">
                        No items
                      </div>
                    )}
                    {order.items?.length > 2 && (
                      <p className="text-center text-xs text-gray-500 py-2 font-medium">
                        +{order.items.length - 2} more
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={trackOrder}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-4 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 text-xs tracking-wide"
                  >
                    Track
                  </button>
                  <button
                    onClick={() => navigate("/menu")}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 text-xs tracking-wide"
                  >
                    Reorder
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourOrders;