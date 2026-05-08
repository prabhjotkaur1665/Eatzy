// // // import { useState } from "react";
// // // import axios from "axios";

// // // const SellerSignup = ({ setIsSignup }) => {

// // //   const [form, setForm] = useState({
// // //     restaurantName: "",
// // //     ownerEmail: "",
// // //     phone: "",
// // //     address: "",
// // //     password: "",
// // //     confirmPassword: "",
// // //     profileImage: null,
// // //   });

// // //   const [preview, setPreview] = useState(null);

// // //   const handleChange = (e) => {
// // //     if (e.target.name === "profileImage") {
// // //       const file = e.target.files[0];
// // //       setForm({ ...form, profileImage: file });

// // //       // 🔥 Image preview
// // //       if (file) {
// // //         setPreview(URL.createObjectURL(file));
// // //       }
// // //     } else {
// // //       setForm({ ...form, [e.target.name]: e.target.value });
// // //     }
// // //   };

// // //   const handleSignup = async (e) => {
// // //     e.preventDefault();

// // //     if (
// // //       !form.restaurantName ||
// // //       !form.ownerEmail ||
// // //       !form.phone ||
// // //       !form.password
// // //     ) {
// // //       alert("Please fill all required fields");
// // //       return;
// // //     }

// // //     if (form.password !== form.confirmPassword) {
// // //       alert("Passwords do not match");
// // //       return;
// // //     }

// // //     try {
// // //       const data = new FormData();

// // //       data.append("restaurantName", form.restaurantName);
// // //       data.append("ownerEmail", form.ownerEmail);
// // //       data.append("phone", form.phone);
// // //       data.append("address", form.address);
// // //       data.append("password", form.password);
// // //       data.append("profileImage", form.profileImage);

// // //       await axios.post(
// // //         "http://localhost:5000/api/seller/signup",
// // //         data,
// // //         {
// // //           headers: { "Content-Type": "multipart/form-data" },
// // //           withCredentials: true,
// // //         }
// // //       );

// // //       alert("Signup Successful ✅");

// // //       // 👉 login page open
// // //       setIsSignup(false);

// // //     } catch (error) {
// // //       alert(error.response?.data?.msg || "Signup Failed ❌");
// // //     }
// // //   };

// // //   return (
// // //     <div className="h-screen flex items-center justify-center bg-gray-100">
// // //       <form
// // //         onSubmit={handleSignup}
// // //         className="bg-white p-8 rounded-2xl shadow-lg w-96"
// // //       >
// // //         <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">
// // //           Create Seller Account
// // //         </h2>

// // //         <input
// // //           type="text"
// // //           name="restaurantName"
// // //           placeholder="Restaurant Name"
// // //           className="w-full mb-3 p-2 border rounded-lg"
// // //           onChange={handleChange}
// // //         />

// // //         <input
// // //           type="email"
// // //           name="ownerEmail"
// // //           placeholder="Owner Email"
// // //           className="w-full mb-3 p-2 border rounded-lg"
// // //           onChange={handleChange}
// // //         />

// // //         <input
// // //           type="text"
// // //           name="phone"
// // //           placeholder="Phone Number"
// // //           className="w-full mb-3 p-2 border rounded-lg"
// // //           onChange={handleChange}
// // //         />

// // //         <input
// // //           type="text"
// // //           name="address"
// // //           placeholder="Address"
// // //           className="w-full mb-3 p-2 border rounded-lg"
// // //           onChange={handleChange}
// // //         />

// // //         {/* IMAGE UPLOAD */}
// // //         <div className="w-full mb-3 text-center">
// // //           <input
// // //             type="file"
// // //             name="profileImage"
// // //             id="fileUpload"
// // //             className="hidden"
// // //             onChange={handleChange}
// // //           />

// // //           <label
// // //             htmlFor="fileUpload"
// // //             className="block w-full cursor-pointer bg-gray-200 p-2 rounded-lg border hover:bg-gray-300"
// // //           >
// // //             {form.profileImage ? "Change Image" : "Choose Profile Image"}
// // //           </label>

// // //           {/* Preview */}
// // //           {preview && (
// // //             <img
// // //               src={preview}
// // //               alt="preview"
// // //               className="w-20 h-20 object-cover rounded-full mx-auto mt-3"
// // //             />
// // //           )}
// // //         </div>

// // //         <input
// // //           type="password"
// // //           name="password"
// // //           placeholder="Password"
// // //           className="w-full mb-3 p-2 border rounded-lg"
// // //           onChange={handleChange}
// // //         />

// // //         <input
// // //           type="password"
// // //           name="confirmPassword"
// // //           placeholder="Confirm Password"
// // //           className="w-full mb-4 p-2 border rounded-lg"
// // //           onChange={handleChange}
// // //         />

// // //         <button className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800">
// // //           Sign Up
// // //         </button>

// // //         <button
// // //           type="button"
// // //           onClick={() => setIsSignup(false)}
// // //           className="w-full mt-4 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700"
// // //         >
// // //           Already have an account? Login
// // //         </button>

// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default SellerSignup;






// // import Seller from "../models/Seller.js";
// // import bcrypt from "bcryptjs";
// // import generateToken from "../utils/generateToken.js";

// // // SIGNUP
// // export const signup = async (req, res) => {
// //   try {
// //     const { restaurantName, ownerEmail, password, phone, address } = req.body;

// //     // Validation
// //     if (!restaurantName || !ownerEmail || !password || !phone) {
// //       return res.status(400).json({
// //         success: false,
// //         msg: "Please fill all required fields"
// //       });
// //     }

// //     // Check if restaurant or email already exists
// //     const existing = await Seller.findOne({
// //       $or: [{ ownerEmail }, { restaurantName }]
// //     });

// //     if (existing) {
// //       return res.status(400).json({
// //         success: false,
// //         msg: "Restaurant name or email already exists"
// //       });
// //     }

// //     // Hash password
// //     const hashedPassword = await bcrypt.hash(password, 12);

// //     let imageUrl = "";

// //     // Handle image upload
// //     if (req.file) {
// //       try {
// //         const imagekit = new (await import("imagekit"))({
// //           publicKey: process.env.IMAGEKIT_PUBLICKEY,
// //           privateKey: process.env.IMAGEKIT_PRIVATEKEY,
// //           urlEndpoint: process.env.IMAGEKIT_URL
// //         });

// //         const response = await imagekit.upload({
// //           file: req.file.buffer,
// //           fileName: `seller_${Date.now()}.jpg`,
// //           folder: "/seller_profiles"
// //         });

// //         imageUrl = response.url;
// //       } catch (imageError) {
// //         console.error("Image upload failed:", imageError);
// //         // Continue without image if upload fails
// //       }
// //     }

// //     // Create seller
// //     const seller = await Seller.create({
// //       restaurantName,
// //       ownerEmail,
// //       phone,
// //       address,
// //       password: hashedPassword,
// //       image: imageUrl
// //     });

// //     // Generate token and send response
// //     generateToken(res, seller._id);

// //     const { password: _, ...sellerResponse } = seller.toObject();
    
// //     res.status(201).json({
// //       success: true,
// //       msg: "Seller created successfully",
// //       seller: sellerResponse
// //     });

// //   } catch (err) {
// //     console.error("Signup error:", err);
// //     res.status(500).json({
// //       success: false,
// //       msg: "Server error during signup"
// //     });
// //   }
// // };

// // // LOGIN
// // export const login = async (req, res) => {
// //   try {
// //     const { restaurantName, ownerEmail, password } = req.body;

// //     if (!restaurantName || !ownerEmail || !password) {
// //       return res.status(400).json({
// //         success: false,
// //         msg: "Please provide all fields"
// //       });
// //     }

// //     // Find seller by restaurantName OR ownerEmail
// //     const seller = await Seller.findOne({
// //       $or: [{ restaurantName }, { ownerEmail }]
// //     }).select("+password");

// //     if (!seller || !(await bcrypt.compare(password, seller.password))) {
// //       return res.status(401).json({
// //         success: false,
// //         msg: "Invalid credentials"
// //       });
// //     }

// //     // Generate token
// //     generateToken(res, seller._id);

// //     const { password: _, ...sellerResponse } = seller.toObject();

// //     res.json({
// //       success: true,
// //       msg: "Login successful",
// //       seller: sellerResponse
// //     });

// //   } catch (err) {
// //     console.error("Login error:", err);
// //     res.status(500).json({
// //       success: false,
// //       msg: "Server error during login"
// //     });
// //   }
// // };

// // // LOGOUT
// // export const logout = async (req, res) => {
// //   res.cookie("token", "", {
// //     httpOnly: true,
// //     secure: false,
// //     sameSite: "strict",
// //     maxAge: 1
// //   });

// //   res.json({
// //     success: true,
// //     msg: "Logged out successfully"
// //   });
// // };

// // // GET PROFILE
// // export const getProfile = async (req, res) => {
// //   try {
// //     const seller = await Seller.findById(req.user.id).select("-password");
    
// //     if (!seller) {
// //       return res.status(404).json({
// //         success: false,
// //         msg: "Seller not found"
// //       });
// //     }

// //     res.json({
// //       success: true,
// //       seller
// //     });
// //   } catch (err) {
// //     console.error("Profile error:", err);
// //     res.status(500).json({
// //       success: false,
// //       msg: "Server error"
// //     });
// //   }
// // };




import { useState } from "react";
import axios from "axios";

const SellerSignup = ({ setIsSignup }) => {
  const [form, setForm] = useState({
    restaurantName: "",
    ownerEmail: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "profileImage") {
      const file = e.target.files[0];
      setProfileImage(file);
      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

 const handleSignup = async (e) => {
  e.preventDefault();

  if (
    !form.restaurantName ||
    !form.ownerEmail ||
    !form.phone ||
    !form.password ||
    form.password !== form.confirmPassword
  ) {
    alert("Please fill all fields correctly");
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post(
      "http://localhost:5000/api/seller/signup",
      {
        restaurantName: form.restaurantName.trim(),
        ownerEmail: form.ownerEmail.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        password: form.password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      alert("Signup successful!");
      window.location.href = "/seller-dashboard";
    }

  } catch (error) {
    console.error("Signup error:", error.response?.data);
    alert(error.response?.data?.msg || "Signup failed");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 overflow-auto">
      <div className="max-w-md w-full max-h-screen overflow-y-auto">
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-gray-100 max-h-[95vh] overflow-y-auto">
          
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b border-gray-200">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Create Seller Account
            </h2>
            <p className="text-gray-600 text-base">
              Start your food delivery business today
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSignup}>
            
            {/* Restaurant Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Restaurant Name *
              </label>
              <input
                type="text"
                name="restaurantName"
                placeholder="e.g. Shahi Biryani House"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm text-base"
                value={form.restaurantName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Owner Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Owner Email *
              </label>
              <input
                type="email"
                name="ownerEmail"
                placeholder="owner@restaurant.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm text-base"
                value={form.ownerEmail}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="9876543210"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm text-base"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address (Optional)
              </label>
              <input
                type="text"
                name="address"
                placeholder="123 Main Street, City"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm text-base"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Restaurant Logo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer">
                <input
                  type="file"
                  name="profileImage"
                  id="profileImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChange}
                />
                <label htmlFor="profileImage" className="cursor-pointer flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center hover:bg-blue-200 transition-colors">
                    <span className="text-2xl">🖼️</span>
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-gray-700">
                      {profileImage ? "Change Logo" : "Upload Logo"}
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG (Optional)</p>
                  </div>
                </label>

                {/* Preview */}
                {preview && (
                  <div className="mt-6 flex justify-center">
                    <div className="relative bg-white p-2 rounded-2xl shadow-md">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setProfileImage(null);
                          setPreview(null);
                        }}
                        className="absolute -top-1 -right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold hover:bg-red-600 transition-all"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password *
              </label>
              <input
                type="password"
                name="password"
                placeholder="Minimum 6 characters"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm text-base"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-type password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm text-base"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 text-lg disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </span>
                </>
              ) : (
                " Create Seller Account"
              )}
            </button>
          </form>

          {/* Login Toggle */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignup(false)}
                className="font-semibold text-blue-600 hover:text-blue-700 transition-all duration-200"
                disabled={loading}
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
        ::-webkit-scrollbar-thumb { 
          background: #cbd5e1; border-radius: 10px; 
        }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
};

export default SellerSignup;



















