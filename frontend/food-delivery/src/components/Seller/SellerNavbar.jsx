// import { useNavigate } from "react-router-dom";
// import { 
//   FaHome, 
//   FaUtensils, 
//   FaChartBar, 
//   FaPlus, 
//   FaTimes,
//   FaBox 
// } from "react-icons/fa";

// const SellerNavbar = ({ setRole }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("sellerProfile");
//     localStorage.removeItem("isSeller");
//     setRole(null);
//     navigate("/");
//   };

//   const menuItems = [
//     { icon: FaHome, label: "Home", path: "/" },
//     { icon: FaUtensils, label: "Menu", path: "/menu" },
//     { icon: FaChartBar, label: "Dashboard", path: "/seller-dashboard" },  // ✅ Fixed path
//     { icon: FaPlus, label: "Add Item", path: "/add-items" },              // ✅ Fixed path
//     { icon: FaBox, label: "Orders", path: "/orders" }
//   ];

//   return (
//     <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-2xl sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
//         <div className="flex items-center gap-4">
//           <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
//             <FaChartBar className="w-7 h-7 text-white" />
//           </div>
//           <h1 className="text-2xl font-black text-white flex items-center gap-2">
//             🍽️ Seller Panel
//           </h1>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-1 bg-white/10 backdrop-blur-sm px-8 py-3 rounded-3xl">
//           {menuItems.map(({ icon: Icon, label, path }) => (
//             <button
//               key={path}
//               onClick={() => navigate(path)}
//               className="flex items-center gap-2 px-6 py-3 text-white/90 hover:text-white hover:bg-white/30 rounded-3xl transition-all duration-300 font-semibold hover:scale-105 hover:shadow-lg"
//               title={label}
//             >
//               <Icon className="w-5 h-5" />
//               <span className="hidden lg:inline">{label}</span>
//             </button>
//           ))}
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden relative">
//           <button className="p-3 text-white hover:bg-white/20 rounded-2xl transition-all">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//         </div>

//         {/* Logout Desktop */}
//         <div className="hidden md:flex items-center gap-3">
//           <button 
//             onClick={handleLogout}
//             className="px-8 py-3 bg-red-500/20 hover:bg-red-500 text-white font-bold rounded-3xl hover:text-white transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-red-400 shadow-xl hover:shadow-2xl hover:scale-105"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default SellerNavbar;








import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaHome, 
  FaUtensils, 
  FaChartBar, 
  FaPlus, 
  FaTimes,
  FaBox 
} from "react-icons/fa";
import axios from "axios";  

const SellerNavbar = ({ setRole }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);  

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/seller/logout", {}, {
        withCredentials: true
      });
    } catch (error) {
      console.log("Logout API error:", error);
    }
    
    setRole(null);
    navigate("/");
  };

  const menuItems = [
    { icon: FaHome, label: "Home", path: "/" },
    { icon: FaUtensils, label: "Menu", path: "/menu" },
    { icon: FaChartBar, label: "Dashboard", path: "/seller-dashboard" },
    { icon: FaPlus, label: "Add Item", path: "/add-items" },
    { icon: FaBox, label: "Orders", path: "/orders" }
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <FaChartBar className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
          Seller Panel
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1 bg-white/10 backdrop-blur-sm px-8 py-3 rounded-3xl">
          {menuItems.map(({ icon: Icon, label, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex items-center gap-2 px-6 py-3 text-white/90 hover:text-white hover:bg-white/30 rounded-3xl transition-all duration-300 font-semibold hover:scale-105 hover:shadow-lg"
              title={label}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden lg:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden relative">
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}  // 🔥 Functional button
            className="p-3 text-white hover:bg-white/20 rounded-2xl transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Logout Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <button 
            onClick={handleLogout}
            className="px-8 py-3 bg-red-500/20 hover:bg-red-500 text-white font-bold rounded-3xl hover:text-white transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-red-400 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>

      {/* 🔥 Mobile Menu Added */}
      {mobileOpen && (
        <div className="md:hidden bg-gradient-to-r from-indigo-700 to-purple-700 backdrop-blur-sm border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            {menuItems.map(({ icon: Icon, label, path }) => (
              <button
                key={path}
                onClick={() => {
                  navigate(path);
                  setMobileOpen(false);  
                }}
                className="w-full flex items-center gap-3 px-6 py-4 text-white/90 hover:text-white hover:bg-white/20 rounded-2xl transition-all duration-300 font-semibold"
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
            {/* Mobile Logout */}
            <button 
              onClick={() => {
                handleLogout();
                setMobileOpen(false);
              }}
              className="w-full flex items-center gap-3 px-6 py-4 bg-red-500/30 hover:bg-red-500 text-white font-bold rounded-2xl transition-all duration-300"
            >
              <FaTimes className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default SellerNavbar;