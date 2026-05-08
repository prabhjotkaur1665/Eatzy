// import React, { useState, useContext } from "react";
// import { StoreContext } from "../../context/StoreContext";
// import { useNavigate } from "react-router-dom";

// const Settings = () => {
//   const navigate = useNavigate();
//   const { user, setUser } = useContext(StoreContext); // User from App.js
//   const [activeTab, setActiveTab] = useState("profile");
//   const [loading, setLoading] = useState(false);
// const [showSellerLogin, setShowSellerLogin] = useState(false);
//   const tabs = [
//     { id: "profile", icon: "👤", label: "Profile" },
//     { id: "orders", icon: "🛒", label: "Orders" },
//     { id: "addresses", icon: "📍", label: "Addresses" },
//     { id: "payments", icon: "💳", label: "Payments" },
//     { id: "seller", icon: "👨‍🍳", label: "Become Seller" },
//     { id: "security", icon: "🔒", label: "Security" },
//     { id: "notifications", icon: "🔔", label: "Notifications" }
//   ];


// const handleLogout = async () => {
//   if (window.confirm("Are you sure you want to logout?")) {
//     try {
//       await axios.post("http://localhost:5000/api/users/logout", {}, {
//         withCredentials: true
//       });
//     } catch (error) {
//       console.log("Logout API error:", error.response?.data);
//     }
    
//     // ✅ FORCE CLEAR EVERYTHING
//     localStorage.clear(); // Clear ALL localStorage
//     sessionStorage.clear(); // Clear sessionStorage
    
//     // ✅ CRITICAL: Clear user from context
//     setUser(null);
    
//     // ✅ Force page reload
//     window.location.href = "/";
//   }
// };

//   const handleBecomeSeller = () => {
//     navigate("/seller-setup"); // New seller setup page
//   };

//   return (
//     <div className="min-h-screen py-16 px-4 bg-gradient-to-br from-slate-50 to-orange-50">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-5xl font-black bg-gradient-to-r from-gray-800 to-slate-800 bg-clip-text text-transparent mb-4">
//             Settings
//           </h1>
//           <p className="text-xl text-gray-600">Manage your account</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Sidebar Tabs */}
//           <div className="lg:col-span-1 space-y-2">
//             {tabs.map(tab => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${
//                   activeTab === tab.id
//                     ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl"
//                     : "bg-white/50 hover:bg-white shadow-lg hover:shadow-xl border border-gray-200 hover:border-orange-200"
//                 }`}
//               >
//                 <span className="text-2xl">{tab.icon}</span>
//                 <span className="font-bold">{tab.label}</span>
//                 {activeTab === tab.id && (
//                   <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
//                 )}
//               </button>
//             ))}
//             {/* Logout Button */}
//             <button
//   onClick={handleLogout}
//   className="w-full flex items-center gap-4 p-4 mt-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all font-bold group"
// >
//   <span className="group-hover:scale-110 transition-transform">🚪</span>
//   <span>Logout</span>
// </button>
//           </div>

//           {/* Content */}
//           <div className="lg:col-span-3 bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
//             {activeTab === "profile" && (
//               <ProfileTab user={user} />
//             )}
//             {activeTab === "orders" && (
//               <OrdersTab />
//             )}
//             {activeTab === "addresses" && (
//               <AddressesTab />
//             )}
//             {activeTab === "payments" && (
//               <PaymentsTab />
//             )}
//             {activeTab === "seller" && (
//               <BecomeSellerTab onConvert={handleBecomeSeller} />
//             )}
//             {activeTab === "security" && (
//               <SecurityTab />
//             )}
//             {activeTab === "notifications" && (
//               <NotificationsTab />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Profile Tab
// const ProfileTab = ({ user }) => {
//   const [editing, setEditing] = useState(false);
//   return (
//     <div>
//       <h2 className="text-3xl font-black mb-8 text-gray-800">Profile</h2>
//       <div className="space-y-6">
//         <div className="flex items-center gap-6">
//           <img 
//             src={user?.avatar || "https://via.placeholder.com/100?text=👤"} 
//             className="w-24 h-24 rounded-3xl object-cover shadow-2xl ring-4 ring-orange-200"
//             alt="Profile"
//           />
//           <div>
//             <h3 className="text-2xl font-bold text-gray-900">{user?.name || "User"}</h3>
//             <p className="text-gray-600">{user?.email}</p>
//             <button className="mt-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-xl font-bold text-sm hover:shadow-xl transition-all">
//               Upload Photo
//             </button>
//           </div>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl">
//           <div>
//             <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
//             <input 
//               defaultValue={user?.name} 
//               className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
//             <input 
//               defaultValue={user?.phone} 
//               className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all"
//             />
//           </div>
//         </div>
        
//         <div className="flex gap-4 pt-6 border-t">
//           <button className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all">
//             Save Changes
//           </button>
//           <button 
//             onClick={() => setEditing(false)}
//             className="flex-1 border-2 border-gray-300 text-gray-700 py-4 px-8 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Orders Tab
// const OrdersTab = () => (
//   <div>
//     <h2 className="text-3xl font-black mb-8 text-gray-800">Recent Orders</h2>
//     <div className="space-y-4">
//       {/* Recent orders list */}
//       <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl border-l-4 border-blue-500">
//         <div className="flex justify-between items-center mb-2">
//           <span className="font-bold text-lg">#ORD123</span>
//           <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold">Delivered</span>
//         </div>
//         <p className="text-gray-600 text-sm">2 items • ₹450 • 2 days ago</p>
//         <button className="mt-3 text-blue-600 font-bold hover:underline">View Details →</button>
//       </div>
//     </div>
//   </div>
// );


// const BecomeSellerTab = ({ setShowLogin }) => (
//   <div>
//     <h2 className="text-3xl font-black mb-8 text-gray-800">Become a Seller</h2>
//     <div className="text-center py-16 bg-gradient-to-b from-emerald-50 to-green-50 rounded-3xl p-12">
//       <div className="w-28 h-28 bg-gradient-to-br from-emerald-400 to-green-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl text-4xl">
//         👨‍🍳
//       </div>
//       <h3 className="text-3xl font-bold text-gray-800 mb-6">Join as Seller</h3>
//       <p className="text-xl text-gray-600 mb-10 max-w-lg mx-auto leading-relaxed">
//         Have a restaurant? Login with your seller account to manage menu, orders & more.
//       </p>
      
//       <div className="flex flex-col sm:flex-row gap-4 justify-center">
//         <button 
//           onClick={() => setShowLogin(true)}  // ✅ Seller Login Modal
//           className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-10 py-4 rounded-3xl font-black text-lg shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-1 max-w-md"
//         >
//           👨‍🍳 Seller Login
//         </button>
//         <button 
//           onClick={() => navigate("/seller-signup")}
//           className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-4 rounded-3xl font-black text-lg shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-1 max-w-md"
//         >
//           ➕ New Seller
//         </button>
//       </div>
//     </div>
//   </div>
// );

// // Placeholder Tabs
// const AddressesTab = () => (
//   <div>
//     <h2 className="text-3xl font-black mb-8 text-gray-800">Saved Addresses</h2>
//     <p className="text-gray-500">Addresses management coming soon...</p>
//   </div>
// );

// const PaymentsTab = () => (
//   <div>
//     <h2 className="text-3xl font-black mb-8 text-gray-800">Payment Methods</h2>
//     <p className="text-gray-500">Payment methods coming soon...</p>
//   </div>
// );

// const SecurityTab = () => (
//   <div>
//     <h2 className="text-3xl font-black mb-8 text-gray-800">Security</h2>
//     <div className="space-y-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl">
//       <div className="flex items-center justify-between p-4 bg-white rounded-2xl">
//         <span>Change Password</span>
//         <button className="text-blue-600 font-bold hover:underline">Change</button>
//       </div>
//       <div className="flex items-center justify-between p-4 bg-white rounded-2xl">
//         <span>Two-Factor Auth</span>
//         <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Off</span>
//       </div>
//     </div>
//   </div>
// );

// const NotificationsTab = () => (
//   <div>
//     <h2 className="text-3xl font-black mb-8 text-gray-800">Notifications</h2>
//     <div className="space-y-4 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl">
//       <label className="flex items-center gap-3 p-4 bg-white rounded-2xl cursor-pointer">
//         <input type="checkbox" className="w-5 h-5 text-purple-600 rounded" />
//         <span>Order Updates</span>
//       </label>
//       <label className="flex items-center gap-3 p-4 bg-white rounded-2xl cursor-pointer">
//         <input type="checkbox" className="w-5 h-5 text-purple-600 rounded" />
//         <span>Promotions & Offers</span>
//       </label>
//     </div>
//   </div>
  
// );

// export default Settings;

























import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ ADD THIS
import { StoreContext } from "../../context/StoreContext";

const Settings = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(StoreContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [showSellerLogin, setShowSellerLogin] = useState(false);

  const tabs = [
    { id: "profile", icon: "👤", label: "Profile" },
    { id: "orders", icon: "🛒", label: "Orders" },
    { id: "addresses", icon: "📍", label: "Addresses" },
    { id: "payments", icon: "💳", label: "Payments" },
    { id: "seller", icon: "👨‍🍳", label: "Become Seller" },
    { id: "security", icon: "🔒", label: "Security" },
    { id: "notifications", icon: "🔔", label: "Notifications" }
  ];



//   const handleLogout = async () => {
//   if (window.confirm("Are you sure you want to logout?")) {
//     try {
//       await axios.post("http://localhost:5000/api/users/logout", {}, {
//         withCredentials: true
//       });
//     } catch (error) {
//       console.log("Logout API ignored:", error);
//     }
    
//     // 🔥 PERFECT CLEAR
//     localStorage.clear();
//     sessionStorage.clear();
//     setUser(null);
    
//     window.location.href = "/";
//   }
// };



const handleLogout = async () => {
  if (!window.confirm("Are you sure you want to logout?")) return;

  try {
    await axios.post(
      "http://localhost:5000/api/users/logout",
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.log("Logout API ignored:", error);
  }

localStorage.removeItem("user");
  sessionStorage.clear();

  setUser(null);

  navigate("/menu");  
};


  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-br from-slate-50 to-orange-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black bg-gradient-to-r from-gray-800 to-slate-800 bg-clip-text text-transparent mb-4">
            Settings
          </h1>
          <p className="text-xl text-gray-600">Manage your account</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1 space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl"
                    : "bg-white/50 hover:bg-white shadow-lg hover:shadow-xl border border-gray-200 hover:border-orange-200"
                }`}
              >
                <span className="text-2xl">{tab.icon}</span>
                <span className="font-bold">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 p-4 mt-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all font-bold group"
            >
              <span className="group-hover:scale-110 transition-transform">🚪</span>
              <span>Logout</span>
            </button>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
            {activeTab === "profile" && <ProfileTab user={user} />}
            {activeTab === "orders" && <OrdersTab />}
            {activeTab === "addresses" && <AddressesTab />}
            {activeTab === "payments" && <PaymentsTab />}
            {activeTab === "seller" && <BecomeSellerTab />}
            {activeTab === "security" && <SecurityTab />}
            {activeTab === "notifications" && <NotificationsTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileTab = ({ user }) => (
  <div>
    <h2 className="text-3xl font-black mb-8 text-gray-800">Profile</h2>
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl flex items-center justify-center text-2xl font-bold text-white shadow-2xl">
          {user?.name?.charAt(0) || "U"}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{user?.name || "User"}</h3>
          <p className="text-gray-600">{user?.email || "No email"}</p>
        </div>
      </div>
    </div>
  </div>
);

const OrdersTab = () => (
  <div>
    <h2 className="text-3xl font-black mb-8 text-gray-800">Recent Orders</h2>
    <p className="text-gray-500">Orders coming soon...</p>
  </div>
);

const BecomeSellerTab = () => (
  <div className="text-center py-16">
    <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-green-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl text-5xl">
      👨‍🍳
    </div>
    <h3 className="text-3xl font-bold text-gray-800 mb-4">Become a Seller</h3>
    <p className="text-xl text-gray-600 mb-8">Seller features coming soon!</p>
    <button className="bg-emerald-500 text-white px-12 py-4 rounded-3xl font-bold text-xl">
      Coming Soon
    </button>
  </div>
);

const AddressesTab = () => (
  <div>
    <h2 className="text-3xl font-black mb-8 text-gray-800">Addresses</h2>
    <p className="text-gray-500">Coming soon...</p>
  </div>
);

const PaymentsTab = () => (
  <div>
    <h2 className="text-3xl font-black mb-8 text-gray-800">Payments</h2>
    <p className="text-gray-500">Coming soon...</p>
  </div>
);

const SecurityTab = () => (
  <div>
    <h2 className="text-3xl font-black mb-8 text-gray-800">Security</h2>
    <p className="text-gray-500">Coming soon...</p>
  </div>
);

const NotificationsTab = () => (
  <div>
    <h2 className="text-3xl font-black mb-8 text-gray-800">Notifications</h2>
    <p className="text-gray-500">Coming soon...</p>
  </div>
);

export default Settings;