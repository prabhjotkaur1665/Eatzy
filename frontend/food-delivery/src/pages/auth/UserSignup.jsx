// import { useState } from "react";
// import axios from "axios";

// const UserSignup = ({ setShowLogin, setRole, setIsSignup }) => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!form.name || !form.email || !form.password) {
//       alert("Please fill all fields");
//       setLoading(false);
//       return;
//     }

//     try {
//       await axios.post("http://localhost:5000/api/users/register", form);

//       alert("Account created successfully! Please login.");
//       setIsSignup(false); // Switch to login

//     } catch (error) {
//       alert(error.response?.data?.msg || "Signup Failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-10 rounded-2xl shadow-2xl w-96 animate-in fade-in zoom-in duration-500">
//       <div className="text-center mb-8">
//         <div className="w-20 h-20 bg-orange-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
//           <span className="text-3xl">✨</span>
//         </div>
//         <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
//         <p className="text-gray-500">Join us today</p>
//       </div>

//       <form onSubmit={handleSignup} className="space-y-4">
//         <div>
//           <input
//             type="text"
//             placeholder="Full Name"
//             className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg"
//             value={form.name}
//             onChange={(e) =>
//               setForm({ ...form, name: e.target.value })
//             }
//             disabled={loading}
//           />
//         </div>

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
//               <span>Creating Account...</span>
//             </>
//           ) : (
//             "Create Account"
//           )}
//         </button>
//       </form>

//       <div className="mt-6 text-center">
//         <p className="text-gray-600">
//           Already have an account?{" "}
//           <button
//             onClick={() => setIsSignup(false)}
//             className="font-semibold text-orange-500 hover:text-orange-600 transition-colors"
//           >
//             Sign In
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

// export default UserSignup;














import { useState } from "react";
import axios from "axios";

const UserSignup = ({ setIsSignup }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      form.password !== form.confirmPassword
    ) {
      alert("Please fill all fields correctly");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        {
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        alert("Signup Successful ");
navigate("/");      }

    } catch (error) {
      alert(error.response?.data?.msg || "Signup Failed ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-xl"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-xl"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-xl"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 border rounded-xl"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => setIsSignup(false)}
            className="text-orange-500 cursor-pointer font-semibold"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default UserSignup;