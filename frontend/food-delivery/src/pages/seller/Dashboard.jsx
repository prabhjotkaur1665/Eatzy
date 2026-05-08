// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { 
//   FaChartLine, 
//   FaShoppingBag, 
//   FaBox, 
//   FaUsers, 
//   FaCreditCard, 
//   FaPlus, 
//   FaUser, 
//   FaUtensils, 
//   FaClock,
//   FaSignOutAlt
// } from "react-icons/fa";

// const SellerDashboard = () => {
//   const navigate = useNavigate();
//   const [seller, setSeller] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     todayRevenue: 0,
//     monthlyRevenue: 0,
//     totalOrders: 0,
//     totalItems: 0,
//     pendingOrders: 0,
//     activeCustomers: 0
//   });

//   // Fetch seller profile
//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:5000/api/seller/profile", {
//         withCredentials: true
//       });
      
//       if (response.data.success) {
//         setSeller(response.data.seller);
//       } else {
//         navigate("/seller-login");
//       }
//     } catch (err) {
//       console.error("Profile error:", err);
//       localStorage.removeItem("sellerProfile");
//       localStorage.removeItem("isSeller");
//       navigate("/seller-login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch stats (mock data - replace with real API)
//   const fetchStats = async () => {
//     setTimeout(() => {
//       setStats({
//         todayRevenue: 2450,
//         monthlyRevenue: 45200,
//         totalOrders: 156,
//         totalItems: 23,
//         pendingOrders: 8,
//         activeCustomers: 342
//       });
//     }, 500);
//   };

//   useEffect(() => {
//     fetchProfile();
//     fetchStats();
//   }, [navigate]);

//   const logout = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/seller/logout", {}, {
//         withCredentials: true
//       });
//     } catch (err) {
//       console.log("Logout error:", err);
//     } finally {
//       localStorage.removeItem("sellerProfile");
//       localStorage.removeItem("isSeller");
//       navigate("/seller-login");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
//         <div className="text-center p-8">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-6"></div>
//           <p className="text-xl font-semibold text-gray-700">Loading Dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!seller) return null;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100">
//       {/* 🔥 HEADER */}
//       <div className="bg-white/90 backdrop-blur-md shadow-xl border-b border-gray-200 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//             <div className="flex items-center space-x-4">
//               <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
//                 <FaShoppingBag className="w-9 h-9 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//                   {seller.restaurantName}
//                 </h1>
//                 <p className="text-lg text-gray-600 font-semibold">{seller.ownerEmail}</p>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-4 flex-wrap gap-3">
//               <span className="px-6 py-3 bg-emerald-100 text-emerald-800 text-lg font-bold rounded-3xl shadow-lg border border-emerald-200">
//                 🟢 Online
//               </span>
//               <button
//                 onClick={logout}
//                 className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
//               >
//                 <FaSignOutAlt className="w-5 h-5" />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* 🔥 STATS CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 mb-16">
//           {[
//             { title: "Today's Revenue", value: `₹${stats.todayRevenue.toLocaleString()}`, icon: FaCreditCard, color: "from-emerald-500 to-green-600" },
//             { title: "Monthly Revenue", value: `₹${stats.monthlyRevenue.toLocaleString()}`, icon: FaChartLine, color: "from-indigo-500 to-blue-600" },
//             { title: "Total Orders", value: stats.totalOrders.toLocaleString(), icon: FaBox, color: "from-purple-500 to-pink-600" },
//             { title: "Menu Items", value: stats.totalItems, icon: FaUtensils, color: "from-orange-500 to-orange-600" },
//             { title: "Pending Orders", value: stats.pendingOrders, icon: FaClock, color: "from-amber-500 to-yellow-600" },
//             { title: "Active Customers", value: stats.activeCustomers.toLocaleString(), icon: FaUsers, color: "from-blue-500 to-cyan-600" }
//           ].map((stat, index) => (
//             <div key={index} className="group bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-500 border border-white/60">
//               <div className="flex items-center justify-between mb-6">
//                 <div className={`p-4 rounded-3xl bg-gradient-to-br ${stat.color} shadow-2xl group-hover:scale-110 transition-all duration-500`}>
//                   <stat.icon className="w-8 h-8 text-white" />
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
//                   {stat.title}
//                 </p>
//                 <p className="text-4xl lg:text-3xl font-black text-gray-900 drop-shadow-xl">
//                   {stat.value}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* 🔥 QUICK ACTIONS - FIXED ROUTES */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
//           {[
//             { 
//               title: "➕ Add New Item", 
//               subtitle: "Add delicious dishes", 
//               icon: FaPlus, 
//               color: "from-emerald-500 to-green-600",
//               path: "/add-items"  // ✅ FIXED
//             },
//             { 
//               title: "🍽️ Manage Menu", 
//               subtitle: "Edit your items", 
//               icon: FaUtensils, 
//               color: "from-blue-500 to-indigo-600",
//               path: "/menu"       // ✅ FIXED
//             },
//             { 
//               title: "📦 View Orders", 
//               subtitle: "Track deliveries", 
//               icon: FaBox, 
//               color: "from-purple-500 to-violet-600",
//               path: "/orders"
//             },
//             { 
//               title: "👤 Edit Profile", 
//               subtitle: "Update details", 
//               icon: FaUser, 
//               color: "from-orange-500 to-red-600",
//               path: "/profile"
//             }
//           ].map((action, index) => (
//             <div 
//               key={index}
//               onClick={() => navigate(action.path)}
//               className="group bg-white/90 backdrop-blur-xl rounded-4xl p-12 shadow-2xl hover:shadow-3xl hover:-translate-y-4 cursor-pointer border border-white/60 hover:border-indigo-200 transition-all duration-700 hover:bg-indigo-50"
//             >
//               <div className={`w-24 h-24 bg-gradient-to-br ${action.color} rounded-4xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-all duration-700 mx-auto`}>
//                 <action.icon className="w-12 h-12 text-white drop-shadow-2xl" />
//               </div>
//               <h3 className="text-3xl font-black text-gray-900 mb-4 text-center group-hover:text-indigo-600 transition-all duration-500">
//                 {action.title}
//               </h3>
//               <p className="text-gray-600 text-center font-bold text-lg">{action.subtitle}</p>
//             </div>
//           ))}
//         </div>

//         {/* 🔥 RECENT ACTIVITY */}
//         <div className="bg-white/90 backdrop-blur-xl rounded-4xl p-12 shadow-3xl border border-white/60">
//           <div className="flex items-center gap-4 mb-10">
//             <div className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse shadow-lg"></div>
//             <h3 className="text-4xl font-black text-gray-900">
//               Recent Activity
//             </h3>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {[
//               { icon: "🍛", text: "New order #1243 - Biryani x 2 (+₹398)", time: "5 min ago" },
//               { icon: "⭐", text: "5⭐ Review: 'Best Biryani ever!'", time: "12 min ago" },
//               { icon: "✏️", text: "Menu updated - Added new items", time: "1 hr ago" },
//               { icon: "💰", text: "Payment received for Order #1242 (₹450)", time: "2 hrs ago" },
//               { icon: "📦", text: "Order #1241 delivered successfully", time: "3 hrs ago" },
//               { icon: "🔔", text: "New customer registered", time: "4 hrs ago" }
//             ].map((activity, index) => (
//               <div key={index} className="flex items-center gap-4 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-3xl hover:bg-indigo-100 transition-all duration-400 group hover:shadow-xl hover:-translate-x-2">
//                 <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{activity.icon}</span>
//                 <div className="flex-1">
//                   <span className="font-bold text-gray-900 text-lg block">{activity.text}</span>
//                   <span className="text-sm text-gray-500 font-mono">{activity.time}</span>
//                 </div>
//                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerDashboard;

















import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  FaChartLine, 
  FaBox, 
  FaUsers, 
  FaPlus, 
  FaUser, 
  FaUtensils, 
  FaClock, 
  FaSignOutAlt,
  FaRupeeSign,
  FaSpinner
} from "react-icons/fa";

const SellerDashboard = () => {
  const navigate = useNavigate();

  const [seller, setSeller] = useState(null);
  const [stats, setStats] = useState({
    todayRevenue: 0,
    monthlyRevenue: 0,
    totalOrders: 0,
    totalItems: 0,
    pendingOrders: 0,
    activeCustomers: 0,
    todayOrders: 0
  });

  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(false);

  // PROFILE
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/seller/profile", {
        withCredentials: true
      });

      if (res.data.success) {
        setSeller(res.data.seller);
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  // STATS
  const fetchStats = async () => {
    try {
      setStatsLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/seller/dashboard-stats",
        { withCredentials: true }
      );

      if (res.data.success) {
        setStats(res.data.stats || {});
      }
    } catch (err) {
      console.log(err);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchProfile();
      await fetchStats();
    };
    load();
  }, []);

  const logout = async () => {
    await axios.post(
      "http://localhost:5000/api/seller/logout",
      {},
      { withCredentials: true }
    );
    navigate("/");
  };

  // LOADING UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl" />
      </div>
    );
  }

  if (!seller) return null;

  // ✅ FIXED STATS ARRAY
  const statsData = [
    { title: "Today's Revenue", value: `₹${(stats.todayRevenue || 0).toLocaleString()}`, icon: FaRupeeSign },
    { title: "Monthly Revenue", value: `₹${(stats.monthlyRevenue || 0).toLocaleString()}`, icon: FaChartLine },
    { title: "Total Orders", value: (stats.totalOrders || 0).toLocaleString(), icon: FaBox },
    { title: "Menu Items", value: stats.totalItems || 0, icon: FaUtensils },
    { title: "Pending Orders", value: stats.pendingOrders || 0, icon: FaClock },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mt-0 mb-8">
        <div>
          <h1 className="text-3xl font-bold">{seller.restaurantName}</h1>
          <p className="text-gray-600">{seller.ownerEmail}</p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        {statsData.map((stat, i) => (
          <div key={i} className="bg-gray-300 p-6 rounded-3xl shadow">
            {stat.icon && <stat.icon className="text-2xl mb-2" />}
            <p className="text-gray-500">{stat.title}</p>
            <h2 className="text-2xl font-bold">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-4 gap-6">
        {[
          { title: "Add Item", icon: FaPlus, path: "/add-items" },
          { title: "Orders", icon: FaBox, path: "/orders" },
          { title: "Menu", icon: FaUtensils, path: "/menu" },
          { title: "Profile", icon: FaUser, path: "/profile" }
        ].map((a, i) => (
          <div
            key={i}
            onClick={() => navigate(a.path)}
            className="bg-gray-300 p-6 rounded-3xl shadow cursor-pointer text-center"
          >
            {a.icon && <a.icon className="text-3xl mb-2 mx-auto" />}
            <p>{a.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;