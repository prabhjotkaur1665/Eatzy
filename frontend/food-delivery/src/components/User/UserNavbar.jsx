// import React, { useState, useRef, useEffect } from "react";
// import { assets } from "../../assets/assests";
// import { BiSearchAlt2 } from "react-icons/bi";
// import { FaBasketShopping, FaClipboardList } from "react-icons/fa6";
// import { FaUserCog } from "react-icons/fa";
// import { useNavigate, useLocation } from "react-router-dom";

// const Navbar = ({ user, setUser, setShowLogin }) => {
//   const navigate = useNavigate();

//   const [menu, setMenu] = useState("HOME");
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchText, setSearchText] = useState("");

//   const searchRef = useRef();
//   const location = useLocation();

//   // fallback data (no error if context missing)
//   const foodList = [];
//   const cartItems = {};

//   // menu active sync
//   useEffect(() => {
//     if (location.pathname === "/") setMenu("HOME");
//     if (location.pathname === "/menu") setMenu("MENU");
//     if (location.pathname === "/your-orders") setMenu("YOUR ORDER");
//     if (location.pathname === "/cart") setMenu("CART");
//     if (location.pathname === "/settings") setMenu("SETTINGS");
//   }, [location.pathname]);

//   // close search on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setSearchOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const filteredItems = (foodList || []).filter((item) =>
//     item.name?.toLowerCase().includes(searchText.toLowerCase())
//   );

//   const totalItems = Object.values(cartItems || {}).reduce(
//     (total, num) => total + num,
//     0
//   );

//   const handleMenuClick = (item) => {
//     if (item === "HOME") {
//       setMenu("HOME");
//       navigate("/");
//     }

//     if (item === "MENU") {
//       setMenu("MENU");
//       navigate("/menu");
//     }

//     if (item === "YOUR ORDER") {
//       if (!user) {
//         setShowLogin(true); // ✅ open modal instead of alert
//         return;
//       }
//       setMenu("YOUR ORDER");
//       navigate("/your-orders");
//     }

//     if (item === "SETTINGS") {
//       if (!user) {
//         setShowLogin(true); // ✅ open modal instead of alert
//         return;
//       }
//       setMenu("SETTINGS");
//       navigate("/settings");
//     }
//   };

//   // profile letter
// const firstLetter = user?.name
//   ? user.name.charAt(0).toUpperCase()
//   : "U";
//   return (
//     <>
//       <style>{`
//         @keyframes shine {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         .button-bg {
//           background: conic-gradient(from 0deg, #00F5FF, #FF00C7, #FFD700, #00FF85, #8A2BE2, #00F5FF);
//           background-size: 300% 300%;
//           animation: shine 4s ease-out infinite;
//         }
//       `}</style>

//       <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 h-35">
//         <div className="max-w-7xl mx-auto flex justify-around items-center py-4 relative">

//           {/* Logo */}
//           <img
//             src={assets.logo_eatzy}
//             alt="logo"
//             className="w-28 cursor-pointer"
//             onClick={() => {
//               setMenu("HOME");
//               navigate("/");
//             }}
//           />

//           {/* Menu */}
//           <ul className="flex gap-10 text-slate-600 text-lg">
//             {["HOME", "MENU", "YOUR ORDER", "SETTINGS"].map((item) => (
//               <li
//                 key={item}
//                 onClick={() => handleMenuClick(item)}
//                 className="group relative cursor-pointer pb-2 transition-all duration-300 hover:text-black"
//               >
//                 {item}
//                 <span
//                   className={`absolute left-0 bottom-0 h-[2px] bg-lime-500 transition-all duration-300
//                   ${menu === item ? "w-full" : "w-0 group-hover:w-full"}`}
//                 ></span>
//               </li>
//             ))}
//           </ul>

//           {/* Icons */}
//           <div className="flex items-center gap-8 relative" ref={searchRef}>

//             {/* Search */}
//             <BiSearchAlt2
//               onClick={() => setSearchOpen(!searchOpen)}
//               className="text-3xl cursor-pointer hover:text-black transition"
//             />

//             {searchOpen && (
//               <div className="absolute top-12 right-24 w-72 bg-white shadow-xl rounded-xl p-3 z-50">
//                 <input
//                   type="text"
//                   placeholder="Search food..."
//                   value={searchText}
//                   onChange={(e) => setSearchText(e.target.value)}
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
//                 />

//                 {searchText && (
//                   <div className="mt-2 max-h-48 overflow-y-auto">
//                     {filteredItems.length > 0 ? (
//                       filteredItems.slice(0, 5).map((item, index) => (
//                         <div
//                           key={index}
//                           className="p-2 hover:bg-gray-100 cursor-pointer rounded-md text-sm"
//                         >
//                           {item.name}
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-gray-400 text-sm p-2">
//                         No items found
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Cart */}
//             <div
//               onClick={() => {
//                 setMenu("CART");
//                 navigate("/cart");
//               }}
//               className={`relative cursor-pointer p-2 rounded-full transition
//               ${menu === "CART" ? "bg-lime-500 text-white" : ""}`}
//             >
//               <FaBasketShopping className="text-2xl" />

//               {totalItems > 0 && (
//                 <span className="absolute min-w-[18px] h-[18px] bg-[tomato] text-white text-xs flex items-center justify-center rounded-full top-[-6px] right-[-8px]">
//                   {totalItems}
//                 </span>
//               )}
//             </div>

//             {/* Profile / Auth */}
//             {user ? (
//               <div className="flex items-center gap-4">

//                 {/* Profile Circle */}
//                 <div className="w-9 h-9 rounded-full bg-lime-500 text-white flex items-center justify-center font-bold">
//                   {firstLetter}
//                 </div>

//                 <button
//   onClick={() => {
//     setUser(null);
//     navigate("/"); // optional redirect
//   }}
//   className="bg-transparent text-lg text-slate-700 border border-slate-400 px-6 py-1 rounded-2xl hover:bg-slate-200 transition"
// >
//   Logout
// </button>
//               </div>
//             ) : (
//               <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100">
//                 <button
//                   onClick={() => setShowLogin(true)} // ✅ open LoginChoice
//                   className="px-8 text-sm py-2.5 text-white rounded-full font-medium bg-gray-800"
//                 >
//                   Login
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;













//                 correct

// import React, { useState, useRef, useEffect, useContext } from "react";
// import { assets } from "../../assets/assests";
// import { BiSearchAlt2 } from "react-icons/bi";
// import { FaBasketShopping } from "react-icons/fa6";
// import { useNavigate, useLocation } from "react-router-dom";
// import { StoreContext } from "../../context/StoreContext"; // ✅ ADD THIS

// const Navbar = ({ user, setUser, setShowLogin }) => {
//   const navigate = useNavigate();

//   const [menu, setMenu] = useState("HOME");
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchText, setSearchText] = useState("");

//   const searchRef = useRef();
//   const location = useLocation();

//   // ✅ CONTEXT DATA
//   const { getTotalItems } = useContext(StoreContext);
//   const totalItems = getTotalItems();

//   // menu active sync
//   useEffect(() => {
//     if (location.pathname === "/") setMenu("HOME");
//     if (location.pathname === "/menu") setMenu("MENU");
//     if (location.pathname === "/your-orders") setMenu("YOUR ORDER");
//     if (location.pathname === "/cart") setMenu("CART");
//     if (location.pathname === "/settings") setMenu("SETTINGS");
//   }, [location.pathname]);

//   // close search on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setSearchOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleMenuClick = (item) => {
//     if (item === "HOME") {
//       setMenu("HOME");
//       navigate("/");
//     }

//     if (item === "MENU") {
//       setMenu("MENU");
//       navigate("/menu");
//     }

//     if (item === "YOUR ORDER") {
//       if (!user) {
//         setShowLogin(true);
//         return;
//       }
//       setMenu("YOUR ORDER");
//       navigate("/your-orders");
//     }

//     if (item === "SETTINGS") {
//       if (!user) {
//         setShowLogin(true);
//         return;
//       }
//       setMenu("SETTINGS");
//       navigate("/settings");
//     }
//   };

//   const firstLetter = user?.name
//     ? user.name.charAt(0).toUpperCase()
//     : "U";

//   return (
//     <>
//       <style>{`
//         @keyframes shine {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         .button-bg {
//           background: conic-gradient(from 0deg, #00F5FF, #FF00C7, #FFD700, #00FF85, #8A2BE2, #00F5FF);
//           background-size: 300% 300%;
//           animation: shine 4s ease-out infinite;
//         }
//       `}</style>

//       <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 h-35">
//         <div className="max-w-7xl mx-auto flex justify-around items-center py-4 relative">

//           {/* Logo */}
//           <img
//             src={assets.logo_eatzy}
//             alt="logo"
//             className="w-28 cursor-pointer"
//             onClick={() => {
//               setMenu("HOME");
//               navigate("/");
//             }}
//           />

//           {/* Menu */}
//           <ul className="flex gap-10 text-slate-600 text-lg">
//             {["HOME", "MENU", "YOUR ORDER", "SETTINGS"].map((item) => (
//               <li
//                 key={item}
//                 onClick={() => handleMenuClick(item)}
//                 className="group relative cursor-pointer pb-2 transition-all duration-300 hover:text-black"
//               >
//                 {item}
//                 <span
//                   className={`absolute left-0 bottom-0 h-[2px] bg-lime-500 transition-all duration-300
//                   ${menu === item ? "w-full" : "w-0 group-hover:w-full"}`}
//                 ></span>
//               </li>
//             ))}
//           </ul>

//           {/* Icons */}
//           <div className="flex items-center gap-8 relative" ref={searchRef}>

//             {/* Search */}
//             <BiSearchAlt2
//               onClick={() => setSearchOpen(!searchOpen)}
//               className="text-3xl cursor-pointer hover:text-black transition"
//             />

//             {/* Cart */}
//             <div
//               onClick={() => {
//                 setMenu("CART");
//                 navigate("/cart");
//               }}
//               className={`relative cursor-pointer p-2 rounded-full transition
//               ${menu === "CART" ? "bg-lime-500 text-white" : ""}`}
//             >
//               <FaBasketShopping className="text-2xl" />

//               {/* ✅ LIVE COUNT */}
//               {totalItems > 0 && (
//                 <span className="absolute min-w-[18px] h-[18px] bg-[tomato] text-white text-xs flex items-center justify-center rounded-full top-[-6px] right-[-8px]">
//                   {totalItems}
//                 </span>
//               )}
//             </div>

//             {/* Profile / Auth */}
//             {user ? (
//               <div className="flex items-center gap-4">

//                 <div className="w-9 h-9 rounded-full bg-lime-500 text-white flex items-center justify-center font-bold">
//                   {firstLetter}
//                 </div>

//                 <button
//                   onClick={() => {
//                     setUser(null);
//                     navigate("/");
//                   }}
//                   className="bg-transparent text-lg text-slate-700 border border-slate-400 px-6 py-1 rounded-2xl hover:bg-slate-200 transition"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100">
//                 <button
//                   onClick={() => setShowLogin(true)}
//                   className="px-8 text-sm py-2.5 text-white rounded-full font-medium bg-gray-800"
//                 >
//                   Login
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;












// import React, { useState, useRef, useEffect, useContext } from "react";
// import { assets } from "../../assets/assests";
// import { BiSearchAlt2 } from "react-icons/bi";
// import { FaBasketShopping } from "react-icons/fa6";
// import { useNavigate, useLocation } from "react-router-dom";
// import { StoreContext } from "../../context/StoreContext";

// const Navbar = ({ user, setUser, setShowLogin }) => {
//   const navigate = useNavigate();

//   const [menu, setMenu] = useState("HOME");
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchText, setSearchText] = useState("");

//   const searchRef = useRef();
//   const location = useLocation();

//   // ✅ CONTEXT DATA
//   const { getTotalItems } = useContext(StoreContext);
//   const totalItems = getTotalItems();

//   // menu active sync
//   useEffect(() => {
//     if (location.pathname === "/") setMenu("HOME");
//     if (location.pathname === "/menu") setMenu("MENU");
//     if (location.pathname === "/your-orders") setMenu("YOUR ORDER");
//     if (location.pathname === "/cart") setMenu("CART");
//     if (location.pathname === "/settings") setMenu("SETTINGS");
//   }, [location.pathname]);

//   // close search on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setSearchOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleMenuClick = (item) => {
//     if (item === "HOME") {
//       setMenu("HOME");
//       navigate("/");
//     }

//     if (item === "MENU") {
//       setMenu("MENU");
//       navigate("/menu");
//     }

//     if (item === "YOUR ORDER") {
//       if (!user) {
//         setShowLogin(true);
//         return;
//       }
//       setMenu("YOUR ORDER");
//       navigate("/your-orders");
//     }

//     if (item === "SETTINGS") {
//       if (!user) {
//         setShowLogin(true);
//         return;
//       }
//       setMenu("SETTINGS");
//       navigate("/settings");
//     }
//   };

//   const firstLetter = user?.name
//     ? user.name.charAt(0).toUpperCase()
//     : "U";

//   return (
//     <>
//       <style>{`
//         @keyframes shine {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         .button-bg {
//           background: conic-gradient(from 0deg, #00F5FF, #FF00C7, #FFD700, #00FF85, #8A2BE2, #00F5FF);
//           background-size: 300% 300%;
//           animation: shine 4s ease-out infinite;
//         }
//       `}</style>

//       <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 h-35">
//         <div className="max-w-7xl mx-auto flex justify-around items-center py-4 relative">

//           {/* Logo */}
//           <img
//             src={assets.logo_eatzy}
//             alt="logo"
//             className="w-28 cursor-pointer"
//             onClick={() => {
//               setMenu("HOME");
//               navigate("/");
//             }}
//           />

//           {/* Menu */}
//           <ul className="flex gap-10 text-slate-600 text-lg">
//             {["HOME", "MENU", "YOUR ORDER", "SETTINGS"].map((item) => (
//               <li
//                 key={item}
//                 onClick={() => handleMenuClick(item)}
//                 className="group relative cursor-pointer pb-2 transition-all duration-300 hover:text-black"
//               >
//                 {item}
//                 <span
//                   className={`absolute left-0 bottom-0 h-[2px] bg-lime-500 transition-all duration-300
//                   ${menu === item ? "w-full" : "w-0 group-hover:w-full"}`}
//                 ></span>
//               </li>
//             ))}
//           </ul>

//           {/* Icons */}
//           <div className="flex items-center gap-8 relative" ref={searchRef}>

//             {/* Search */}
//             <BiSearchAlt2
//               onClick={() => setSearchOpen(!searchOpen)}
//               className="text-3xl cursor-pointer hover:text-black transition"
//             />

//             {/* Cart */}
//             <div
//               onClick={() => {
//                 setMenu("CART");
//                 navigate("/cart");
//               }}
//               className={`relative cursor-pointer p-2 rounded-full transition
//               ${menu === "CART" ? "bg-lime-500 text-white" : ""}`}
//             >
//               <FaBasketShopping className="text-2xl" />

//               {/* ✅ LIVE COUNT */}
//               {totalItems > 0 && (
//                 <span className="absolute min-w-[18px] h-[18px] bg-[tomato] text-white text-xs flex items-center justify-center rounded-full top-[-6px] right-[-8px]">
//                   {totalItems}
//                 </span>
//               )}
//             </div>

//             {/* Profile / Auth */}
//             {user ? (
//               <div className="flex items-center gap-4">
//                 {/* ✅ ONLY SHOW PROFILE AVATAR - NO LOGOUT */}
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lime-500 to-emerald-500 text-white flex items-center justify-center font-bold shadow-lg hover:scale-105 transition-all cursor-pointer">
//                   {firstLetter}
//                 </div>
//               </div>
//             ) : (
//               <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100">
//                 <button
//                   onClick={() => setShowLogin(true)}
//                   className="px-8 text-sm py-2.5 text-white rounded-full font-medium bg-gray-800"
//                 >
//                   Login
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;











// import React, { useState, useRef, useEffect, useContext } from "react";
// import { assets } from "../../assets/assests";
// import { BiSearchAlt2 } from "react-icons/bi";
// import { FaBasketShopping } from "react-icons/fa6";
// import { useNavigate, useLocation } from "react-router-dom";
// import { StoreContext } from "../../context/StoreContext";

// // const Navbar = ({ setShowLogin, user }) => {

//   const navigate = useNavigate();

//   const [menu, setMenu] = useState("HOME");
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchText, setSearchText] = useState("");

//   const searchRef = useRef();
//   const location = useLocation();

//   // ✅ CONTEXT (🔥 MOST IMPORTANT CHANGE)
// const { user, getTotalItems } = useContext(StoreContext);

//   const totalItems = getTotalItems();

//   // menu active sync
//   useEffect(() => {
//     if (location.pathname === "/") setMenu("HOME");
//     if (location.pathname === "/menu") setMenu("MENU");
//     if (location.pathname === "/your-orders") setMenu("YOUR ORDER");
//     if (location.pathname === "/cart") setMenu("CART");
//     if (location.pathname === "/settings") setMenu("SETTINGS");
//   }, [location.pathname]);

//   // close search on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setSearchOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleMenuClick = (item) => {
//     if (item === "HOME") {
//       setMenu("HOME");
//       navigate("/");
//     }

//     if (item === "MENU") {
//       setMenu("MENU");
//       navigate("/menu");
//     }

//     if (item === "YOUR ORDER") {
//       if (!user) {
//         setShowLogin(true);
//         return;
//       }
//       setMenu("YOUR ORDER");
//       navigate("/your-orders");
//     }

//     if (item === "SETTINGS") {
//       if (!user) {
//         setShowLogin(true);
//         return;
//       }
//       setMenu("SETTINGS");
//       navigate("/settings");
//     }
//   };

//   const firstLetter = user?.name
//     ? user.name.charAt(0).toUpperCase()
//     : "U";

//   return (
//     <>
//       <style>{`
//         @keyframes shine {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         .button-bg {
//           background: conic-gradient(from 0deg, #00F5FF, #FF00C7, #FFD700, #00FF85, #8A2BE2, #00F5FF);
//           background-size: 300% 300%;
//           animation: shine 4s ease-out infinite;
//         }
//       `}</style>

//       <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 h-35">
//         <div className="max-w-7xl mx-auto flex justify-around items-center py-4 relative">

//           {/* Logo */}
//           <img
//             src={assets.logo_eatzy}
//             alt="logo"
//             className="w-28 cursor-pointer"
//             onClick={() => {
//               setMenu("HOME");
//               navigate("/");
//             }}
//           />

//           {/* Menu */}
//           <ul className="flex gap-10 text-slate-600 text-lg">
//             {["HOME", "MENU", "YOUR ORDER", "SETTINGS"].map((item) => (
//               <li
//                 key={item}
//                 onClick={() => handleMenuClick(item)}
//                 className="group relative cursor-pointer pb-2 transition-all duration-300 hover:text-black"
//               >
//                 {item}
//                 <span
//                   className={`absolute left-0 bottom-0 h-[2px] bg-lime-500 transition-all duration-300
//                   ${menu === item ? "w-full" : "w-0 group-hover:w-full"}`}
//                 ></span>
//               </li>
//             ))}
//           </ul>

//           {/* Icons */}
//           <div className="flex items-center gap-8 relative" ref={searchRef}>

//             {/* Search */}
//             <BiSearchAlt2
//               onClick={() => setSearchOpen(!searchOpen)}
//               className="text-3xl cursor-pointer hover:text-black transition"
//             />

//             {/* Cart */}
//             <div
//               onClick={() => {
//                 setMenu("CART");
//                 navigate("/cart");
//               }}
//               className={`relative cursor-pointer p-2 rounded-full transition
//               ${menu === "CART" ? "bg-lime-500 text-white" : ""}`}
//             >
//               <FaBasketShopping className="text-2xl" />

//               {totalItems > 0 && (
//                 <span className="absolute min-w-[18px] h-[18px] bg-[tomato] text-white text-xs flex items-center justify-center rounded-full top-[-6px] right-[-8px]">
//                   {totalItems}
//                 </span>
//               )}
//             </div>

//             {/* ✅ PROFILE / LOGIN FIX */}
//             {user ? (
//               <div className="flex items-center gap-4">
//                 <div
//                   onClick={() => navigate("/settings")}
//                   className="w-12 h-12 rounded-full bg-gradient-to-br from-lime-500 to-emerald-500 text-white flex items-center justify-center font-bold shadow-lg hover:scale-105 transition-all cursor-pointer"
//                 >
//                   {firstLetter}
//                 </div>
//               </div>
//             ) : (
//               <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100">
//                 <button
//                   onClick={() => setShowLogin(true)}
//                   className="px-8 text-sm py-2.5 text-white rounded-full font-medium bg-gray-800"
//                 >
//                   Login
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// // };

// export default Navbar;












import React, { useState, useRef, useEffect, useContext } from "react";
import { assets } from "../../assets/assests";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaBasketShopping } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menu, setMenu] = useState("HOME");
  const [searchOpen, setSearchOpen] = useState(false);

  const searchRef = useRef();

  // CONTEXT
  const { user, getTotalItems } = useContext(StoreContext);
  const totalItems = getTotalItems();

  //  MENU SYNC
  useEffect(() => {
    if (location.pathname === "/") setMenu("HOME");
    if (location.pathname === "/menu") setMenu("MENU");
    if (location.pathname === "/your-orders") setMenu("YOUR ORDER");
    if (location.pathname === "/cart") setMenu("CART");
    if (location.pathname === "/settings") setMenu("SETTINGS");
  }, [location.pathname]);

  //  OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (item) => {
    if (item === "HOME") {
      setMenu("HOME");
      navigate("/");
    }

    if (item === "MENU") {
      setMenu("MENU");
      navigate("/menu");
    }

    if (item === "YOUR ORDER") {
      if (!user) return setShowLogin(true);
      setMenu("YOUR ORDER");
      navigate("/your-orders");
    }

    if (item === "SETTINGS") {
      if (!user) return setShowLogin(true);
      setMenu("SETTINGS");
      navigate("/settings");
    }
  };

  const firstLetter = user?.name
    ? user.name.charAt(0).toUpperCase()
    : "U";

  return (
    <>
      {/* ✅ ANIMATION STYLE (same as your old) */}
      <style>{`
        @keyframes shine {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .button-bg {
          background: conic-gradient(from 0deg, #00F5FF, #FF00C7, #FFD700, #00FF85, #8A2BE2, #00F5FF);
          background-size: 300% 300%;
          animation: shine 4s ease-out infinite;
        }
      `}</style>

      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 h-35">
        <div className="max-w-7xl mx-auto flex justify-around items-center py-4 relative">

          {/* LOGO */}
          <img
            src={assets.logo_eatzy}
            alt="logo"
            className="w-28 cursor-pointer"
            onClick={() => {
              setMenu("HOME");
              navigate("/");
            }}
          />

          {/* MENU */}
          <ul className="flex gap-10 text-slate-600 text-lg">
            {["HOME", "MENU", "YOUR ORDER", "SETTINGS"].map((item) => (
              <li
                key={item}
                onClick={() => handleMenuClick(item)}
                className="group relative cursor-pointer pb-2 hover:text-black"
              >
                {item}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-lime-500 transition-all duration-300
                  ${menu === item ? "w-full" : "w-0 group-hover:w-full"}`}
                ></span>
              </li>
            ))}
          </ul>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-8 relative" ref={searchRef}>

            {/* SEARCH */}
            <BiSearchAlt2
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-3xl cursor-pointer hover:text-black"
            />

            {/* CART */}
            <div
              onClick={() => {
                setMenu("CART");
                navigate("/cart");
              }}
              className={`relative cursor-pointer p-2 rounded-full ${
                menu === "CART" ? "bg-lime-500 text-white" : ""
              }`}
            >
              <FaBasketShopping className="text-2xl" />

              {totalItems > 0 && (
                <span className="absolute min-w-[18px] h-[18px] bg-[tomato] text-white text-xs flex items-center justify-center rounded-full top-[-6px] right-[-8px]">
                  {totalItems}
                </span>
              )}
            </div>

            {/* ✅ LOGIN / PROFILE */}
            {user ? (
              <div
                onClick={() => navigate("/settings")}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-lime-500 to-emerald-500 text-white flex items-center justify-center font-bold shadow-lg cursor-pointer"
              >
                {firstLetter}
              </div>
            ) : (
              <div className="button-bg rounded-full p-0.5 hover:scale-105 transition">
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-8 text-sm py-2.5 text-white rounded-full font-medium bg-gray-800"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;