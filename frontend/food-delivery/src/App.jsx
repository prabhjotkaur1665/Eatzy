                        // ryt code for seller working only

// import { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import UserNavbar from "./components/User/UserNavbar";
// import SellerNavbar from "./components/Seller/SellerNavbar";
// import Footer from "./components/User/Footer";
// import Home from "./pages/Home";
// import MenuPage from "./pages/MenuPage";  // ✅ Menu import
// import LoginChoice from "./pages/auth/LoginChoice";
// import SellerDashboard from "./pages/seller/Dashboard";
// import AddItems from "./pages/seller/Additems";
// import Orders from "./pages/seller/Orders";  // ✅ Orders import
// import axios from "axios";

// function App() {
//   const [role, setRole] = useState(null);
//   const [showLogin, setShowLogin] = useState(false);
//   const [loading, setLoading] = useState(true);
  

//   // 🔥 Cookie-based auth check (NO LOCALSTORAGE)
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/seller/profile", {
//           withCredentials: true
//         });
//         if (response.data.success) {
//           setRole("seller");
//         } else {
//           setRole(null);
//         }
//       } catch (error) {
//         setRole(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkAuth();
//   }, []);

//   const isSeller = role === "seller";

//   axios.defaults.withCredentials = true;

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-100">
//         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <Router>
//       {/* Navbar */}
//       {isSeller ? (
//         <SellerNavbar setRole={setRole} />
//       ) : (
//         <UserNavbar setShowLogin={setShowLogin} />
//       )}

//       {/* Routes */}
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100">
//         <Routes>
//           {/* ✅ PUBLIC ROUTES - Sabke liye */}
//           <Route path="/" element={<Home />} />
//           <Route path="/menu" element={<MenuPage />} />  {/* 🔥 Menu - PUBLIC */}

//           {/* ✅ SELLER PROTECTED ROUTES */}
//           <Route
//   path="/seller-dashboard"
//   element={
//     loading ? (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin h-12 w-12 border-b-2 border-indigo-600 rounded-full"></div>
//       </div>
//     ) : isSeller ? (
//       <SellerDashboard />
//     ) : (
//       <Navigate to="/" />
//     )
//   }
// /><Route
//   path="/add-items"
//   element={
//     loading ? (
//       <div>Loading...</div>
//     ) : isSeller ? (
//       <AddItems />
//     ) : (
//       <Navigate to="/" />
//     )
//   }
// />

// <Route
//   path="/orders"
//   element={
//     loading ? (
//       <div>Loading...</div>
//     ) : isSeller ? (
//       <Orders />
//     ) : (
//       <Navigate to="/" />
//     )
//   }
// />
          
//           {/* Other routes */}
//           <Route path="/cart" element={<div>Cart Page</div>} />
//           <Route path="/profile" element={<div>Profile Page</div>} />
          
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </div>

//       {showLogin && (
//         <LoginChoice setShowLogin={setShowLogin} setRole={setRole} />
//       )}
//       {!isSeller && <Footer />}
//     </Router>
//   );
// }

// export default App;






//                                   correct 

// import { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { StoreContextProvider } from "./context/StoreContext";  
// import UserNavbar from "./components/User/UserNavbar";
// import SellerNavbar from "./components/Seller/SellerNavbar";
// import Footer from "./components/User/Footer";
// import Home from "./pages/Home";
// import MenuPage from "./pages/MenuPage";
// import LoginChoice from "./pages/auth/LoginChoice";
// import SellerDashboard from "./pages/seller/Dashboard";
// import AddItems from "./pages/seller/Additems";
// import Orders from "./pages/seller/Orders";
// import axios from "axios";

// function App() {
//   const [role, setRole] = useState(null);
//   const [showLogin, setShowLogin] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // ✅ NEW: user state
//   const [user, setUser] = useState(null);

//   // 🔥 Seller auth (UNCHANGED)
// // useEffect(() => {
// //   const checkAuth = async () => {
// //     try {
// //       const response = await axios.get(
// //         "http://localhost:5000/api/seller/profile",
// //         {
// //           withCredentials: true,
// //         }
// //       );

// //       if (response.data.success) {
// //         setRole("seller");
// //       } else {
// //         setRole(null);
// //       }

// //     } catch (error) {
// //       // ✅ IGNORE 401 (normal case)
// //       if (error.response?.status !== 401) {
// //         console.error("Auth error:", error);
// //       }
// //       setRole(null);

// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   checkAuth();
// // }, []);


// // useEffect(() => {
// //   const checkUserAuth = async () => {
// //     try {
// //       const res = await axios.get(
// //         "http://localhost:5000/api/users/profile",
// //         { withCredentials: true }
// //       );

// //       if (res.data.success) {
// //         setUser(res.data.user);
// //       } else {
// //         setUser(null);
// //       }

// //     } catch {
// //       setUser(null);
// //     }
// //   };

// //   checkUserAuth();
// // }, []);



// useEffect(() => {
//   const checkAuth = async () => {
//     try {
//       // 🔹 Check USER first
//       const userRes = await axios.get(
//         "http://localhost:5000/api/users/profile",
//         { withCredentials: true }
//       );

//       if (userRes.data.success) {
//         setUser(userRes.data.user);
//         setRole("user");
//         return;
//       }
//     } catch (err) {
//       // ignore
//     }

//     try {
//       // 🔹 Check SELLER
//       const sellerRes = await axios.get(
//         "http://localhost:5000/api/seller/profile",
//         { withCredentials: true }
//       );

//       if (sellerRes.data.success) {
//         setRole("seller");
//       } else {
//         setRole(null);
//       }
//     } catch (err) {
//       setRole(null);
//     }
//   };

//   checkAuth().finally(() => {
//     setLoading(false); // ✅ ALWAYS run
//   });
// }, []);



//   const isSeller = role === "seller";

//   axios.defaults.withCredentials = true;

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-100">
//         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
// <StoreContextProvider>

//     <Router>
//       {/* Navbar */}
//       {isSeller ? (
//         <SellerNavbar setRole={setRole} />
//       ) : (
//         <UserNavbar
//           setShowLogin={setShowLogin}
//           user={user}          // ✅ PASS USER
//           setUser={setUser}    // ✅ PASS LOGOUT
//         />
//       )}

//       {/* Routes */}
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/menu" element={<MenuPage />} />

//           {/* SELLER ROUTES (UNCHANGED) */}
//           <Route
//             path="/seller-dashboard"
//             element={
//               loading ? (
//                 <div className="min-h-screen flex items-center justify-center">
//                   <div className="animate-spin h-12 w-12 border-b-2 border-indigo-600 rounded-full"></div>
//                 </div>
//               ) : isSeller ? (
//                 <SellerDashboard />
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />

//           <Route
//             path="/add-items"
//             element={
//               loading ? (
//                 <div>Loading...</div>
//               ) : isSeller ? (
//                 <AddItems />
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />

//           <Route
//             path="/orders"
//             element={
//               loading ? (
//                 <div>Loading...</div>
//               ) : isSeller ? (
//                 <Orders />
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />

//           <Route path="/cart" element={<div>Cart Page</div>} />
//           <Route path="/profile" element={<div>Profile Page</div>} />

//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </div>

//       {/* ✅ LOGIN MODAL */}
//       {showLogin && (
//         <LoginChoice
//           setShowLogin={setShowLogin}
//           setRole={setRole}
//           setUser={setUser}   // ✅ ADD THIS
//         />
//       )}

//       {!isSeller && <Footer />}
//     </Router>
    
//     </StoreContextProvider>
//   );
// }

// export default App;





// import { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { StoreContextProvider } from "./context/StoreContext";  
// import UserNavbar from "./components/User/UserNavbar";
// import SellerNavbar from "./components/Seller/SellerNavbar";
// import Footer from "./components/User/Footer";
// import Home from "./pages/Home";
// import MenuPage from "./pages/MenuPage";
// import Cart from "./pages/user/Cart";         // ✅ IMPORTED
// import PlaceOrder from "./pages/user/PlaceOrder";      // ✅ ADD
// import Payment from "./pages/user/Payment";         // ✅ ADD  
// import TrackOrder from "./pages/user/TrackOrder";     // ✅ ADD
// import YourOrders from "./pages/user/YourOrder";
// import Settings from "./pages/user/Settings";  // ✅ Fixed import
// import LoginChoice from "./pages/auth/LoginChoice";
// import SellerDashboard from "./pages/seller/Dashboard";
// import AddItems from "./pages/seller/Additems";
// import Orders from "./pages/seller/Orders";
// import axios from "axios";


// function App() {
//   const [role, setRole] = useState(null);
//   const [showLogin, setShowLogin] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         // 🔹 Check USER first
//         const userRes = await axios.get(
//           "http://localhost:5000/api/users/profile",
//           { withCredentials: true }
//         );

//         if (userRes.data.success) {
//           setUser(userRes.data.user);
//           setRole("user");
//           return;
//         }
//       } catch (err) {
//         // ignore
//       }

//       try {
//         // 🔹 Check SELLER
//         const sellerRes = await axios.get(
//           "http://localhost:5000/api/seller/profile",
//           { withCredentials: true }
//         );

//         if (sellerRes.data.success) {
//           setRole("seller");
//         } else {
//           setRole(null);
//         }
//       } catch (err) {
//         setRole(null);
//       }
//     };

//     checkAuth().finally(() => {
//       setLoading(false);
//     });
//   }, []);

//   const isSeller = role === "seller";

//   axios.defaults.withCredentials = true;

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-100">
//         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <StoreContextProvider>
//       <Router>
//         {/* Navbar */}
//         {isSeller ? (
//           <SellerNavbar setRole={setRole} />
//         ) : (
//           <UserNavbar
//             setShowLogin={setShowLogin}
//             user={user}
//             setUser={setUser}
//           />
//         )}

//         {/* Routes */}
//         <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/menu" element={<MenuPage />} />
//             <Route path="/cart" element={<Cart />} />        {/* ✅ FIXED ROUTE */}

//             {/* SELLER ROUTES */}
//             <Route
//               path="/seller-dashboard"
//               element={
//                 loading ? (
//                   <div className="min-h-screen flex items-center justify-center">
//                     <div className="animate-spin h-12 w-12 border-b-2 border-indigo-600 rounded-full"></div>
//                   </div>
//                 ) : isSeller ? (
//                   <SellerDashboard />
//                 ) : (
//                   <Navigate to="/" />
//                 )
//               }
//             />

//             <Route
//               path="/add-items"
//               element={
//                 loading ? (
//                   <div>Loading...</div>
//                 ) : isSeller ? (
//                   <AddItems />
//                 ) : (
//                   <Navigate to="/" />
//                 )
//               }
//             />

//             <Route
//               path="/orders"
//               element={
//                 loading ? (
//                   <div>Loading...</div>
//                 ) : isSeller ? (
//                   <Orders />
//                 ) : (
//                   <Navigate to="/" />
//                 )
//               }
//             />
// <Route path="/place-order" element={<PlaceOrder />} />
// <Route path="/payment" element={<Payment />} />
//             <Route path="/track-order" element={<TrackOrder />} />
//             <Route path="/your-orders" element={<YourOrders />} />
// <Route path="/settings" element={<Settings />} />
//             <Route path="/profile" element={<div>Profile Page</div>} />
//             <Route path="*" element={<Navigate to="/" />} />

// <UserNavbar user={user} setUser={setUser} />

//           </Routes>
//         </div>

//         {/* LOGIN MODAL */}
//         {showLogin && (
//           <LoginChoice
//             setShowLogin={setShowLogin}
//             setRole={setRole}
//             setUser={setUser}
//           />
//         )}

//         {!isSeller && <Footer />}
//       </Router>
//     </StoreContextProvider>
//   );
// }

// export default App;









// correct


// import { useState, useEffect } from "react";
// // import { useContext } from "react";
// // import { StoreContext } from "./context/StoreContext";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { StoreContextProvider } from "./context/StoreContext";  
// import UserNavbar from "./components/User/UserNavbar"; 
// import SellerNavbar from "./components/Seller/SellerNavbar";
// import Footer from "./components/User/Footer";
// import Home from "./pages/Home";
// import MenuPage from "./pages/MenuPage";
// import Cart from "./pages/user/Cart";
// import YourOrders from "./pages/user/YourOrder";
// import Settings from "./pages/user/Settings";  
// import LoginChoice from "./pages/auth/LoginChoice";
// import TrackOrder from "./pages/user/TrackOrder";
// import PlaceOrder from "./pages/user/PlaceOrder";
// import SellerDashboard from "./pages/seller/Dashboard";
// import AddItems from "./pages/seller/Additems";
// import Orders from "./pages/seller/Orders";
// import axios from "axios";
// import Payment from "./pages/user/Payment";


// axios.defaults.withCredentials = true;

// function App() {
//   const [role, setRole] = useState(null);
//   const [showLogin, setShowLogin] = useState(false);
//   const [loading, setLoading] = useState(true);
//   // const [user, setUser] = useState(null);

// // const { user, setUser } = useContext(StoreContext);



//   useEffect(() => {
//   const checkAuth = async () => {
//     try {
//       const userRes = await axios.get(
//         "http://localhost:5000/api/users/profile",
//         { withCredentials: true }
//       );

//       if (userRes.data.success) {
//         setRole("user"); // ✅ only role set karo
//         return;
//       }
//     } catch {}

//     try {
//       const sellerRes = await axios.get(
//         "http://localhost:5000/api/seller/profile",
//         { withCredentials: true }
//       );

//       if (sellerRes.data.success) {
//         setRole("seller");
//       } else {
//         setRole(null);
//       }
//     } catch {
//       setRole(null);
//     }
//   };

//   checkAuth().finally(() => setLoading(false));
// }, []);


//   const isSeller = role === "seller";
//   axios.defaults.withCredentials = true;

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin h-12 w-12 border-b-2 border-indigo-600 rounded-full"></div>
//       </div>
//     );
//   }


//   return (
//     <StoreContextProvider>
//       <Router>
//         {/* ✅ NAVBAR OUTSIDE ROUTES */}
//         {isSeller ? (
//           <SellerNavbar setRole={setRole} />
//         ) : (
//           <UserNavbar setShowLogin={setShowLogin} />
//         )}

//         {/* ✅ ROUTES ONLY */}
//         <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 pt-20">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/menu" element={<MenuPage />} />
//             <Route path="/cart" element={<Cart />} />
            
//             {/* Seller Routes */}
//             <Route path="/seller-dashboard" element={isSeller ? <SellerDashboard /> : <Navigate to="/" />} />
//             <Route path="/add-items" element={isSeller ? <AddItems /> : <Navigate to="/" />} />
//             <Route path="/orders" element={isSeller ? <Orders /> : <Navigate to="/" />} />
            
//             {/* User Routes */}
//             <Route path="/your-orders" element={<YourOrders />} />
//             <Route path="/settings" element={<Settings />} />
//             <Route path="/place-order" element={<PlaceOrder />} />
//             <Route path="/track-order" element={<TrackOrder />} />
//             <Route path="/payment" element={<Payment/>} />

//           </Routes>
//         </div>

//         {/* Login Modal */}
//         {showLogin && (
//           <LoginChoice setShowLogin={setShowLogin} setRole={setRole} setUser={setUser} />
//         )}

//         {!isSeller && <Footer />}
//       </Router>
//     </StoreContextProvider>
//   );
// }

// export default App;









import { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { StoreContextProvider, StoreContext } from "./context/StoreContext";

import UserNavbar from "./components/User/UserNavbar";
import SellerNavbar from "./components/Seller/SellerNavbar";
import Footer from "./components/User/Footer";

import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import Cart from "./pages/user/Cart";
import YourOrders from "./pages/user/YourOrder";
import Settings from "./pages/user/Settings";
import LoginChoice from "./pages/auth/LoginChoice";
import TrackOrder from "./pages/user/TrackOrder";
import PlaceOrder from "./pages/user/PlaceOrder";
import Payment from "./pages/user/Payment";

import SellerDashboard from "./pages/seller/Dashboard";
import AddItems from "./pages/seller/Additems";
import Orders from "./pages/seller/Orders";

import axios from "axios";

axios.defaults.withCredentials = true;

// 🔥 Separate component (important)
function AppContent() {
  const [role, setRole] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  const { setUser } = useContext(StoreContext); // ✅ NOW WORKS

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userRes = await axios.get(
          "http://localhost:5000/api/users/profile",
          { withCredentials: true }
        );

        if (userRes.data.success) {
          setUser(userRes.data.user); // ✅ FIXED
          setRole("user");
          return;
        }
      } catch {}

      try {
        const sellerRes = await axios.get(
          "http://localhost:5000/api/seller/profile",
          { withCredentials: true }
        );

        if (sellerRes.data.success) {
          setRole("seller");
        } else {
          setRole(null);
        }
      } catch {
        setRole(null);
      }
    };

    checkAuth().finally(() => setLoading(false));
  }, []);

  const isSeller = role === "seller";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-b-2 border-indigo-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <Router>
      {/* Navbar */}
      {isSeller ? (
        <SellerNavbar setRole={setRole} />
      ) : (
        <UserNavbar setShowLogin={setShowLogin} />
      )}

      {/* Routes */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<Cart />} />

          {/* Seller */}
          <Route
            path="/seller-dashboard"
            element={isSeller ? <SellerDashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/add-items"
            element={isSeller ? <AddItems /> : <Navigate to="/" />}
          />
          <Route
            path="/orders"
            element={isSeller ? <Orders /> : <Navigate to="/" />}
          />

          {/* User */}
          <Route path="/your-orders" element={<YourOrders />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <LoginChoice
          setShowLogin={setShowLogin}
          setRole={setRole}
          setUser={setUser} // ✅ NOW VALID
        />
      )}

      {!isSeller && <Footer />}
    </Router>
  );
}

// 🔥 MAIN EXPORT
function App() {
  return (
    <StoreContextProvider>
      <AppContent />
    </StoreContextProvider>
  );
}

export default App;