// import { useState } from "react";
// import axios from "axios";

// const UserLogin = ({ setShowLogin, setRole, setIsSignup }) => {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!form.email || !form.password) {
//       alert("Please fill all fields");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/users/login",
//         form
//       );

//       // ✅ NO LOCALSTORAGE - Backend handles session
//       alert("Login Successful ✅");
//       setShowLogin(false);
//       setRole(null); // Reset to role selection

//     } catch (error) {
//       alert(error.response?.data?.msg || "Login Failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-10 rounded-2xl shadow-2xl w-96 animate-in fade-in zoom-in duration-500">
//       <div className="text-center mb-8">
//         <div className="w-20 h-20 bg-orange-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
//           <span className="text-3xl">👤</span>
//         </div>
//         <h2 className="text-3xl font-bold text-gray-800 mb-2">User Login</h2>
//         <p className="text-gray-500">Welcome back! Please sign in</p>
//       </div>

//       <form onSubmit={handleLogin} className="space-y-4">
//         <div>
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg"
//             value={form.email}
//             onChange={(e) =>
//               setForm({ ...form, email: e.target.value })
//             }
//             disabled={loading}
//           />
//         </div>

//         <div>
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg"
//             value={form.password}
//             onChange={(e) =>
//               setForm({ ...form, password: e.target.value })
//             }
//             disabled={loading}
//           />
//         </div>

//         <button 
//           type="submit"
//           disabled={loading}
//           className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
//         >
//           {loading ? (
//             <>
//               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               <span>Signing In...</span>
//             </>
//           ) : (
//             "Sign In"
//           )}
//         </button>
//       </form>

//       <div className="mt-6 text-center">
//         <p className="text-gray-600">
//           Don't have an account?{" "}
//           <button
//             onClick={() => setIsSignup(true)}
//             className="font-semibold text-orange-500 hover:text-orange-600 transition-colors"
//           >
//             Create Account
//           </button>
//         </p>
//       </div>

//       <button
//         onClick={() => {
//           setRole(null);
//           setIsSignup(false);
//         }}
//         className="w-full mt-4 text-gray-500 hover:text-gray-700 text-sm transition-colors"
//       >
//         ← Back to Role Selection
//       </button>
//     </div>
//   );
// };

// export default UserLogin;















// import { useState } from "react";
// import axios from "axios";

// const UserLogin = ({ setShowLogin, setIsSignup, setUser }) => {
//   const [form, setForm] = useState({ email: "", password: "" });

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!form.email || !form.password) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//      const res = await axios.post(
//   "http://localhost:5000/api/users/login",
//   form,
//   { withCredentials: true }
// );

//       // ✅ VERY IMPORTANT (missing before)
//       setUser(res.data.user);

//       alert("Login Successful ✅");
//       setShowLogin(false);

//     } catch (error) {
//       alert(error.response?.data?.msg || "Login Failed ❌");
//     }
//   };

//   return (
//     <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
//       <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
//         Welcome Back 👋
//       </h2>

//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email Address"
//           className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
//           value={form.email}
//           onChange={(e) =>
//             setForm({ ...form, email: e.target.value })
//           }
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
//           value={form.password}
//           onChange={(e) =>
//             setForm({ ...form, password: e.target.value })
//           }
//         />

//         <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold">
//           Login
//         </button>
//       </form>

//       <p className="text-center mt-4 text-sm text-gray-500">
//         Don't have an account?{" "}
//         <span
//           onClick={() => setIsSignup(true)}
//           className="text-orange-500 cursor-pointer font-medium"
//         >
//           Sign Up
//         </span>
//       </p>
//     </div>
//   );
// };

// export default UserLogin;


















// import { useState } from "react";
// import axios from "axios";

// const UserLogin = ({ setShowLogin }) => {
//   const [form, setForm] = useState({ email: "", password: "" });

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!form.email || !form.password) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/users/login",
//         form,
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         alert("Login Successful ✅");

//         // 🔥 SAME AS SELLER
//         window.location.reload();
//       }

//     } catch (error) {
//       alert(error.response?.data?.msg || "Login Failed ❌");
//     }
//   };

//   return (
//     <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
//       <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
//         Welcome Back 👋
//       </h2>

//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email Address"
//           className="w-full mb-4 p-3 border rounded-lg"
//           value={form.email}
//           onChange={(e) =>
//             setForm({ ...form, email: e.target.value })
//           }
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full mb-4 p-3 border rounded-lg"
//           value={form.password}
//           onChange={(e) =>
//             setForm({ ...form, password: e.target.value })
//           }
//         />

//         <button className="w-full bg-orange-500 text-white py-2 rounded-lg">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserLogin;








import { useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const UserLogin = ({ setIsSignup, setShowLogin }) => {

  const { setUser } = useContext(StoreContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email: form.email,
          password: form.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        alert("Login Successful");

        const userRes = await axios.get(
          "http://localhost:5000/api/users/profile",
          { withCredentials: true }
        );

 setUser(userRes.data.user);
  localStorage.setItem("user", JSON.stringify(userRes.data.user));

        setShowLogin(false);
      }

    } catch (error) {
      alert(error.response?.data?.msg || "Login Failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
          User Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded-lg"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded-lg"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
          Login
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => setIsSignup(true)}
            className="text-orange-500 cursor-pointer font-semibold"
          >
            Create Account
          </span>
        </p>
      </form>
    </div>
  );
};

export default UserLogin;