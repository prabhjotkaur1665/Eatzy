// import { useState } from "react";
// import UserLogin from "./UserLogin";
// import UserSignup from "./userSignup";
// import SellerLogin from "./SellerLogin";
// import SellerSignup from "./SellerSignup";

// const LoginChoice = ({ setShowLogin }) => {
//   const [role, setRole] = useState(null); // user | seller
//   const [isSignup, setIsSignup] = useState(false);

//   // Seller Login Success ke baad
// const handleSellerLogin = () => {
//   localStorage.setItem("sellerProfile", JSON.stringify(sellerData));
//   localStorage.setItem("isSeller", "true");
//   setRole("seller");  // ✅ App ko batao
//   setShowLogin(false);
//   navigate("/seller-dashboard");
// };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

//       {/* CLOSE BUTTON */}
//       <button
//         onClick={() => setShowLogin(false)}
//         className="absolute top-5 right-5 text-white text-2xl"
//       >
//         ✕
//       </button>

//       {/* ROLE SELECTION */}
//       {!role && (
//         <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-96">
//           <h1 className="text-3xl font-bold mb-6 text-gray-800">
//             Welcome
//           </h1>

//           <p className="mb-6 text-gray-500">Login as:</p>

//           <button
//             onClick={() => setRole("user")}
//             className="w-full mb-4 bg-orange-500 text-white py-2 rounded-lg"
//           >
//             User Login
//           </button>

//           <button
//             onClick={() => setRole("seller")}
//             className="w-full bg-gray-800 text-white py-2 rounded-lg"
//           >
//             Seller Login
//           </button>
//         </div>
//       )}

// {role === "seller" && !isSignup && (
//   <SellerLogin
//     setShowLogin={setShowLogin}
//     setIsSignup={setIsSignup}
//   />
// )}

// {role === "seller" && isSignup && (
//   <SellerSignup
//     setShowLogin={setShowLogin}
//     setIsSignup={setIsSignup}
//   />
// )}
  
//     </div>
//   );
// };

// export default LoginChoice; 




                                  // ryt for seller only 

// import { useState } from "react";
// import UserLogin from "./UserLogin";
// import UserSignup from "./UserSignup"; // fix casing
// import SellerLogin from "./SellerLogin";
// import SellerSignup from "./SellerSignup";

// const LoginChoice = ({ setShowLogin, setRole, setUser }) => {
//   const [role, setRole] = useState(null);
//   const [isSignup, setIsSignup] = useState(false);

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

//       {/* CLOSE BUTTON */}
//       <button
//         onClick={() => setShowLogin(false)}
//         className="absolute top-5 right-5 text-white text-2xl"
//       >
//         ✕
//       </button>

//       {/* ROLE SELECTION */}
//       {!role && (
//         <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-96">
//           <h1 className="text-3xl font-bold mb-6 text-gray-800">
//             Welcome
//           </h1>

//           <p className="mb-6 text-gray-500">Login as:</p>

//           <button
//             onClick={() => setRole("user")}
//             className="w-full mb-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
//           >
//             User Login
//           </button>

//           <button
//             onClick={() => setRole("seller")}
//             className="w-full bg-gray-800 text-white py-2 rounded-lg"
//           >
//             Seller Login
//           </button>
//         </div>
//       )}

//       {/* USER FLOW */}
//       {role === "user" && !isSignup && (
//         <UserLogin
//           setShowLogin={setShowLogin}
//           setIsSignup={setIsSignup}
//         />
//       )}

//       {role === "user" && isSignup && (
//         <UserSignup
//           setShowLogin={setShowLogin}
//           setIsSignup={setIsSignup}
//         />
//       )}

//       {/* SELLER FLOW (UNCHANGED) */}
//       {role === "seller" && !isSignup && (
//         <SellerLogin
//           setShowLogin={setShowLogin}
//           setIsSignup={setIsSignup}
//         />
//       )}

//       {role === "seller" && isSignup && (
//         <SellerSignup
//           setShowLogin={setShowLogin}
//           setIsSignup={setIsSignup}
//         />
//       )}

//     </div>
//   );
// };

// export default LoginChoice;








import { useState } from "react";
import UserLogin from "./UserLogin";
import UserSignup from "./UserSignup"; 
import SellerLogin from "./SellerLogin";
import SellerSignup from "./SellerSignup";


const LoginChoice = ({ setShowLogin, setRole, setUser }) => {

  const [selectedRole, setSelectedRole] = useState(null); // ✅ rename
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setShowLogin(false)}
        className="absolute top-5 right-5 text-white text-2xl"
      >
        ✕
      </button>

      {/* ROLE SELECTION */}
      {!selectedRole && (
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-96">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Welcome
          </h1>

          <p className="mb-6 text-gray-500">Login as:</p>

          <button
            onClick={() => setSelectedRole("user")}
            className="w-full mb-4 bg-orange-500 text-white py-2 rounded-lg"
          >
            User Login
          </button>

          <button
            onClick={() => setSelectedRole("seller")}
            className="w-full bg-gray-800 text-white py-2 rounded-lg"
          >
            Seller Login
          </button>
        </div>
      )}

      {/* USER FLOW */}
      {selectedRole === "user" && !isSignup && (
        <UserLogin
          setShowLogin={setShowLogin}
          setIsSignup={setIsSignup}
          setUser={setUser}
        />
      )}

      {selectedRole === "user" && isSignup && (
        <UserSignup
          setShowLogin={setShowLogin}
          setIsSignup={setIsSignup}
        />
      )}

      {/* SELLER FLOW (UNCHANGED) */}
      {selectedRole === "seller" && !isSignup && (
        <SellerLogin
          setShowLogin={setShowLogin}
          setIsSignup={setIsSignup}
        />
      )}

      {selectedRole === "seller" && isSignup && (
        <SellerSignup
          setShowLogin={setShowLogin}
          setIsSignup={setIsSignup}
        />
      )}

    </div>
  );
};

export default LoginChoice;