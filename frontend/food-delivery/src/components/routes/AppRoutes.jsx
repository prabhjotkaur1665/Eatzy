// import { Routes, Route } from "react-router-dom";

// // Auth
// import LoginChoice from "../../pages/auth/LoginChoice";
// import UserLogin from "../../pages/auth/UserLogin";
// import SellerLogin from "../../pages/auth/SellerLogin";

// // User
// import Home from "../../pages/user/Home";
// import Menu from "../../pages/user/Menu";
// import Cart from "../../pages/user/Cart";

// // Seller
// import Dashboard from "../../pages/seller/Dashboard";
// import AddItem from "../../pages/seller/AddItem";

// const AppRoutes = ({ role }) => {
//   return (
//     <Routes>
//       {/* Common */}
//       <Route path="/" element={<Home />} />
//       <Route path="/user-login" element={<UserLogin />} />
//       <Route path="/seller-login" element={<SellerLogin />} />

//       {/* User */}
//       {role === "user" && (
//         <>
//           <Route path="/home" element={<Home />} />
//           <Route path="/menu" element={<Menu />} />
//           <Route path="/cart" element={<Cart />} />
//         </>
//       )}

//       {/* Seller */}
//       {role === "seller" && (
//         <>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/add-item" element={<AddItem />} />
//         </>
//       )}
//     </Routes>
//   );
// };

// export default AppRoutes;