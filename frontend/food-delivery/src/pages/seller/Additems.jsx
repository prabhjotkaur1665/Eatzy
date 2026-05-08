// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { 
//   FaPlus, 
//   FaCamera, 
//   FaTimes,
//   FaCheckCircle,
//   FaExclamationCircle
// } from "react-icons/fa";

// const AddItems = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     category: "Noodles",
//     price: "",
//     calories: "",
//     prepTime: "",
//     isAvailable: true,
//     image: null,
//     restaurantName: "",
//     ownerEmail: ""
//   });
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [restaurants, setRestaurants] = useState([]);
//   const fileInputRef = useRef(null);

//   // Categories for restaurant menu
//   const categories = [
//     "Noodles", "Pizza", "Burger", "Rice", "Biryani", "Chinese", 
//     "South Indian", "Desserts", "Drinks", "Starters"
//   ];

//   // Fetch restaurants on component mount
//   useEffect(() => {
//     fetchRestaurants();
//   }, []);

//   const fetchRestaurants = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/seller/restaurants", {
//         withCredentials: true
//       });
//       setRestaurants(response.data.restaurants || []);
//     } catch (error) {
//       console.error("Error fetching restaurants:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.size < 5 * 1024 * 1024) { // 5MB limit
//       setFormData(prev => ({ ...prev, image: file }));
//       setPreview(URL.createObjectURL(file));
//       showMessage("Image selected successfully", "success");
//     } else {
//       showMessage("Please select image less than 5MB", "error");
//     }
//   };

//   const showMessage = (text, type) => {
//     setMessage({ type, text });
//     setTimeout(() => setMessage({ type: "", text: "" }), 4000);
//   };

//   // handleSubmit function ko replace karo - YE PERFECT HOGA
// const handleSubmit = async (e) => {
//   e.preventDefault();
  
//   // Validation
//   if (!formData.name?.trim() || !formData.price || !formData.image || !formData.restaurantName?.trim() || !formData.ownerEmail?.trim()) {
//     showMessage("Please fill all required fields", "error");
//     return;
//   }

//   setLoading(true);
//   setMessage({ type: "", text: "" }); // Clear previous messages

//   try {
//     const submitData = new FormData();
//     submitData.append("name", formData.name.trim());
//     submitData.append("description", formData.description?.trim() || "");
//     submitData.append("category", formData.category);
//     submitData.append("price", parseFloat(formData.price));
//     submitData.append("calories", formData.calories ? parseInt(formData.calories) : "");
//     submitData.append("prepTime", formData.prepTime ? parseInt(formData.prepTime) : "");
//     submitData.append("isAvailable", formData.isAvailable);
//     submitData.append("restaurantName", formData.restaurantName.trim());
//     submitData.append("ownerEmail", formData.ownerEmail.trim());
    
//     if (formData.image) {
//       submitData.append("image", formData.image);
//     }

//     console.log("📤 Sending data:", {
//       name: formData.name,
//       price: formData.price,
//       restaurantName: formData.restaurantName,
//       ownerEmail: formData.ownerEmail,
//       hasImage: !!formData.image
//     });

//     const response = await axios.post(
//        "http://localhost:5000/api/menu/add",
//       submitData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         withCredentials: true,
//       },
//       { timeout: 30000 }
//     );

//     console.log("✅ Response:", response.data);

//     if (response.data.success) {
//       showMessage("✅ Item added successfully!", "success");
//       // Reset form
//       setFormData({
//         name: "",
//         description: "",
//         category: "Noodles",
//         price: "",
//         calories: "",
//         prepTime: "",
//         isAvailable: true,
//         image: null,
//         restaurantName: "",
//         ownerEmail: ""
//       });
//       setPreview(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     }
//   } catch (error) {
//     console.error("❌ Full Error:", error);
//     console.error("❌ Response:", error.response?.data);
//     console.error("❌ Status:", error.response?.status);
    
//     const errorMsg = error.response?.data?.msg || 
//                     error.response?.data?.message || 
//                     error.message || 
//                     "Failed to add item";
    
//     showMessage(errorMsg, "error");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* 🔥 HEADER */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full shadow-xl mb-6">
//             <FaPlus className="w-6 h-6 text-white mr-2" />
//             <h1 className="text-2xl font-bold text-white">
//               Add New Menu Item
//             </h1>
//           </div>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Add delicious items to your restaurant menu and start receiving orders
//           </p>
//         </div>

//         {/* 🔥 FORM */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-12">
          
//           {/* Message */}
//           {message.text && (
//             <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 ${
//               message.type === "success" 
//                 ? "bg-emerald-100 border border-emerald-300 text-emerald-800" 
//                 : "bg-red-100 border border-red-300 text-red-800"
//             }`}>
//               {message.type === "success" ? (
//                 <FaCheckCircle className="w-6 h-6" />
//               ) : (
//                 <FaExclamationCircle className="w-6 h-6" />
//               )}
//               <span className="font-medium">{message.text}</span>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-8">
            
//             {/* 🔥 IMAGE UPLOAD */}
//             <div>
//               <label className="block text-lg font-semibold text-gray-800 mb-4">
//                 Food Image *
//               </label>
//               {/* Image upload code remains same */}
//               <div 
//                 className="relative border-2 border-dashed border-gray-300 hover:border-indigo-400 p-12 rounded-3xl text-center cursor-pointer hover:bg-indigo-50 transition-all duration-300 group"
//                 onClick={() => fileInputRef.current?.click()}
//               >
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept="image/*"
//                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                   onChange={handleImageChange}
//                 />
//                 {preview ? (
//                   <div className="relative">
//                     <img
//                       src={preview}
//                       alt="Preview"
//                       className="w-48 h-48 mx-auto object-cover rounded-2xl shadow-2xl"
//                     />
//                     <button
//                       type="button"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setPreview(null);
//                         setFormData(prev => ({ ...prev, image: null }));
//                         fileInputRef.current.value = "";
//                       }}
//                       className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-200"
//                     >
//                       <FaTimes className="w-5 h-5" />
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center gap-4 text-gray-500 group-hover:text-indigo-600 transition-colors">
//                     <FaCamera className="w-20 h-20 p-5 bg-gray-100 rounded-3xl shadow-md group-hover:shadow-xl transition-all duration-300" />
//                     <div>
//                       <p className="font-bold text-xl">Click to upload</p>
//                       <p className="text-sm opacity-75">PNG, JPG, GIF up to 5MB</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* 🔥 FORM FIELDS */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Food Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="e.g. Chicken Biryani"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 text-lg shadow-sm"
//                   required
//                 />
//               </div>

//               {/* Price */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Price (₹) *
//                 </label>
//                 <input
//                   type="number"
//                   name="price"
//                   placeholder="199"
//                   value={formData.price}
//                   onChange={handleInputChange}
//                   min="0"
//                   step="0.01"
//                   className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 transition-all duration-300 text-lg shadow-sm"
//                   required
//                 />
//               </div>

//               {/* Restaurant Name */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Restaurant Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="restaurantName"
//                   placeholder="e.g. Shahi Dawaat"
//                   value={formData.restaurantName}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 text-lg shadow-sm"
//                   required
//                 />
//               </div>

//               {/* Owner Email */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Owner Email *
//                 </label>
//                 <input
//                   type="email"
//                   name="ownerEmail"
//                   placeholder="owner@example.com"
//                   value={formData.ownerEmail}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 text-lg shadow-sm"
//                   required
//                 />
//               </div>

//               {/* Category */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Category *
//                 </label>
//                 <select
//                   name="category"
//                   value={formData.category}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 text-lg shadow-sm appearance-none bg-white"
//                 >
//                   {categories.map(cat => (
//                     <option key={cat} value={cat}>{cat}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Description */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   rows="4"
//                   placeholder="Describe your delicious dish..."
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-4 border border-gray-300 rounded-2xl resize-vertical focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-lg shadow-sm"
//                 />
//               </div>

//               {/* Calories & Prep Time */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Calories (Optional)
//                 </label>
//                 <input
//                   type="number"
//                   name="calories"
//                   placeholder="450"
//                   value={formData.calories}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 shadow-sm"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Prep Time (mins)
//                 </label>
//                 <input
//                   type="number"
//                   name="prepTime"
//                   placeholder="25"
//                   value={formData.prepTime}
//                   onChange={handleInputChange}
//                   min="1"
//                   className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-500 transition-all duration-300 shadow-sm"
//                 />
//               </div>

//               {/* Availability Toggle */}
//               <div className="md:col-span-2">
//                 <label className="flex items-center gap-3 text-lg font-semibold text-gray-700 mb-2">
//                   <input
//                     type="checkbox"
//                     name="isAvailable"
//                     checked={formData.isAvailable}
//                     onChange={handleInputChange}
//                     className="w-6 h-6 text-indigo-600 rounded focus:ring-indigo-500"
//                   />
//                   Available for Orders
//                 </label>
//               </div>
//             </div>

//             {/* 🔥 SUBMIT BUTTON */}
//             <button
//               type="submit"
//               disabled={loading || !formData.name || !formData.price || !formData.image || !formData.restaurantName || !formData.ownerEmail}
//               className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 hover:from-indigo-700 hover:via-purple-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-6 px-8 rounded-3xl text-xl shadow-2xl hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 transform hover:-translate-y-1 disabled:cursor-not-allowed disabled:transform-none"
//             >
//               {loading ? (
//                 <>
//                   <div className="inline-flex items-center gap-3">
//                     <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
//                     Adding to Menu...
//                   </div>
//                 </>
//               ) : (
//                 "🚀 Add Item to Menu"
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddItems;















// import React, { useState, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaPlus, FaCamera, FaTimes, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

// const AddItems = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "", description: "", category: "Noodles", price: "", 
//     calories: "", prepTime: "", isAvailable: true, image: null,
//     restaurantName: "", ownerEmail: ""
//   });
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const fileInputRef = useRef(null);

//   const categories = ["Noodles", "Pizza", "Burger", "Rice", "Biryani", "Chinese", "South Indian", "Desserts", "Drinks", "Starters"];

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.size < 5 * 1024 * 1024) {
//       setFormData(prev => ({ ...prev, image: file }));
//       setPreview(URL.createObjectURL(file));
//       showMessage("Image selected", "success");
//     } else {
//       showMessage("Image must be < 5MB", "error");
//     }
//   };

//   const showMessage = (text, type) => {
//     setMessage({ type, text });
//     setTimeout(() => setMessage({ type: "", text: "" }), 3000);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.name?.trim() || !formData.price || !formData.image || !formData.restaurantName?.trim() || !formData.ownerEmail?.trim()) {
//       showMessage("Fill all required fields", "error");
//       return;
//     }

//     setLoading(true);
    
//     try {
//       const submitData = new FormData();
//       Object.keys(formData).forEach(key => {
//         if (key === 'image') {
//           if (formData[key]) submitData.append(key, formData[key]);
//         } else {
//           submitData.append(key, formData[key]);
//         }
//       });

//       const response = await axios.post("http://localhost:5000/api/menu/add", submitData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//         timeout: 30000
//       });

//       if (response.data.success) {
//         showMessage("✅ Item added successfully! Redirecting...", "success");
//         setTimeout(() => navigate('/'), 1500); // Auto redirect to home
//         // Reset form
//         setFormData({ name: "", description: "", category: "Noodles", price: "", calories: "", prepTime: "", isAvailable: true, image: null, restaurantName: "", ownerEmail: "" });
//         setPreview(null);
//         fileInputRef.current.value = "";
//       }
//     } catch (error) {
//       const errorMsg = error.response?.data?.msg || "Failed to add item";
//       showMessage(errorMsg, "error");
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 py-8 px-4">
//       <div className="max-w-2xl mx-auto">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl text-white font-bold mb-4">
//             <FaPlus className="w-5 h-5 mr-2" />
//             Add Menu Item
//           </div>
//         </div>

//         {message.text && (
//           <div className={`mb-6 p-3 rounded-xl flex items-center gap-2 text-sm ${
//             message.type === "success" 
//               ? "bg-emerald-100 border border-emerald-300 text-emerald-800" 
//               : "bg-red-100 border border-red-300 text-red-800"
//           }`}>
//             {message.type === "success" ? <FaCheckCircle className="w-5 h-5" /> : <FaExclamationCircle className="w-5 h-5" />}
//             {message.text}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-8 space-y-6">
          
//           {/* Compact Image Upload */}
//           <div className="text-center">
//             <label className="block text-sm font-semibold text-gray-700 mb-3">Food Image *</label>
//             <div 
//               className="w-48 h-48 mx-auto border-2 border-dashed border-gray-300 hover:border-indigo-400 rounded-2xl cursor-pointer hover:bg-indigo-50 transition-all p-8 flex flex-col items-center justify-center group"
//               onClick={() => fileInputRef.current?.click()}
//             >
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleImageChange}
//               />
//               {preview ? (
//                 <div className="relative">
//                   <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
//                   <button
//                     type="button"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setPreview(null);
//                       setFormData(prev => ({ ...prev, image: null }));
//                       fileInputRef.current.value = "";
//                     }}
//                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
//                   >
//                     <FaTimes className="w-4 h-4" />
//                   </button>
//                 </div>
//               ) : (
//                 <div className="text-gray-500 group-hover:text-indigo-600">
//                   <FaCamera className="w-12 h-12 mb-3 opacity-75" />
//                   <p className="text-xs font-medium">Click to upload</p>
//                   <p className="text-xs opacity-75">Max 5MB</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Compact Form Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-semibold text-gray-700 mb-1">Food Name *</label>
//               <input name="name" value={formData.name} onChange={handleInputChange} 
//                 className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-sm" required />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-700 mb-1">Price (₹) *</label>
//               <input type="number" name="price" value={formData.price} onChange={handleInputChange} min="0" step="0.01"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 text-sm" required />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-700 mb-1">Restaurant *</label>
//               <input name="restaurantName" value={formData.restaurantName} onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-200 text-sm" required />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-700 mb-1">Owner Email *</label>
//               <input type="email" name="ownerEmail" value={formData.ownerEmail} onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-200 text-sm" required />
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-xs font-semibold text-gray-700 mb-1">Category *</label>
//               <select name="category" value={formData.category} onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-200 text-sm">
//                 {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//               </select>
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
//               <textarea name="description" rows="3" value={formData.description} onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200 resize-vertical text-sm" />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-700 mb-1">Calories</label>
//               <input type="number" name="calories" value={formData.calories} onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm" />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-700 mb-1">Prep Time (min)</label>
//               <input type="number" name="prepTime" value={formData.prepTime} onChange={handleInputChange} min="1"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm" />
//             </div>
//           </div>

//           <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
//             <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleInputChange}
//               className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500" />
//             Available for Orders
//           </label>

//           <button
//             type="submit"
//             disabled={loading || !formData.price || !formData.image || !formData.restaurantName || !formData.ownerEmail}
//             className="w-full bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-xl text-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
//           >
//             {loading ? (
//               <>
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                 Adding...
//               </>
//             ) : (
//               "🚀 Add to Menu"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddItems;






import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaCamera, FaTimes, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";


const AddItems = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", description: "", category: "Noodles", price: "", 
    calories: "", prepTime: "", isAvailable: true, image: null,
    restaurantName: "", ownerEmail: ""
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const fileInputRef = useRef(null);

  const categories = ["Noodles", "Pizza", "Burger", "Rice", "Biryani", "Chinese", "South Indian", "Desserts", "Drinks", "Starters"];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 5 * 1024 * 1024) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
      showMessage("Image selected", "success");
    } else {
      showMessage("Image must be < 5MB", "error");
    }
  };

  const showMessage = (text, type) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 4000);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("calories", formData.calories);
    data.append("prepTime", formData.prepTime);
    data.append("isAvailable", formData.isAvailable);

    data.append("restaurantName", formData.restaurantName);
    data.append("ownerEmail", formData.ownerEmail);

    if (formData.image) {
      data.append("image", formData.image);
    }

    const res = await axios.post(
      "http://localhost:5000/api/menu/add",
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );

    console.log("SUCCESS:", res.data);

    showMessage("Item added successfully 🎉", "success");

    setTimeout(() => {
      navigate("/menu");
    }, 1000);

  } catch (error) {
    console.error("ADD ITEM ERROR:", error);
    showMessage("Failed to add item ", "error");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl text-white font-bold text-xl shadow-2xl mb-6 mx-auto max-w-max">
            <FaPlus className="w-6 h-6 mr-3" />
            Add New Menu Item
          </div>
          <p className="text-lg text-gray-600 font-medium">Fill details to add delicious dish to your menu</p>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold shadow-lg transform transition-all ${
            message.type === "success" 
              ? "bg-emerald-100 border-4 border-emerald-200 text-emerald-800 animate-bounce" 
              : "bg-red-100 border-4 border-red-200 text-red-800"
          }`}>
            {message.type === "success" ? (
              <FaCheckCircle className="w-6 h-6 flex-shrink-0" />
            ) : (
              <FaExclamationCircle className="w-6 h-6 flex-shrink-0" />
            )}
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-3xl border border-white/60 p-8 space-y-6">
          
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Dish Image *</label>
            <div 
              className="relative border-4 border-dashed border-gray-300 hover:border-indigo-500 rounded-3xl cursor-pointer hover:bg-indigo-50 transition-all duration-300 p-12 flex flex-col items-center justify-center group hover:shadow-xl"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              
              {preview ? (
                <>
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-40 h-40 object-cover rounded-2xl shadow-2xl mb-4"
                  />
                  <p className="text-sm font-semibold text-gray-700 mb-2">Image Ready</p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreview(null);
                      setFormData(prev => ({ ...prev, image: null }));
                      fileInputRef.current.value = "";
                    }}
                    className="absolute -top-6 -right-6 bg-red-500 hover:bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all group-hover:scale-110"
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>
                </>
              ) : (
                <>
                  <FaCamera className="w-20 h-20 text-gray-400 mb-6 group-hover:text-indigo-500 group-hover:scale-110 transition-all duration-300" />
                  <div>
                    <p className="text-xl font-bold text-gray-700 mb-1 group-hover:text-indigo-600">Click to upload</p>
                    <p className="text-sm text-gray-500">JPG, PNG (Max 5MB)</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/*  Compact Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Food Name *</label>
              <input 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-3 focus:ring-indigo-200 focus:border-indigo-500 text-base font-medium shadow-sm transition-all hover:shadow-md" 
                placeholder="Chicken Biryani"
                required 
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Price (₹) *</label>
              <input 
                type="number" 
                name="price" 
                value={formData.price} 
                onChange={handleInputChange}
                min="0" step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-3 focus:ring-emerald-200 focus:border-emerald-500 text-base font-medium shadow-sm transition-all hover:shadow-md" 
                placeholder="299"
                required 
              />
            </div>

            {/* Restaurant Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Restaurant Name *</label>
              <input 
                name="restaurantName" 
                value={formData.restaurantName} 
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-3 focus:ring-purple-200 focus:border-purple-500 text-base font-medium shadow-sm transition-all hover:shadow-md" 
                placeholder="Shahi Biryani House"
                required 
              />
            </div>

            {/* Owner Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Owner Email *</label>
              <input 
                type="email" 
                name="ownerEmail" 
                value={formData.ownerEmail} 
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-3 focus:ring-orange-200 focus:border-orange-500 text-base font-medium shadow-sm transition-all hover:shadow-md" 
                placeholder="owner@restaurant.com"
                required 
              />
            </div>

            {/* Category */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Category *</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-3 focus:ring-indigo-200 focus:border-indigo-500 text-base font-medium shadow-sm transition-all hover:shadow-md"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Description</label>
              <textarea 
                name="description" 
                rows="3" 
                value={formData.description} 
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-3 focus:ring-blue-200 focus:border-blue-500 text-base font-medium shadow-sm transition-all resize-vertical hover:shadow-md"
                placeholder="Describe your delicious dish..."
              />
            </div>

            {/* Calories & Prep Time */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Calories (Optional)</label>
              <input 
                type="number" 
                name="calories" 
                value={formData.calories} 
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-3 focus:ring-teal-200 focus:border-teal-500 text-base font-medium shadow-sm transition-all hover:shadow-md" 
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Prep Time (min)</label>
              <input 
                type="number" 
                name="prepTime" 
                value={formData.prepTime} 
                onChange={handleInputChange}
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-3 focus:ring-amber-200 focus:border-amber-500 text-base font-medium shadow-sm transition-all hover:shadow-md" 
              />
            </div>
          </div>

          {/* Available Toggle */}
          <label className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200 hover:border-indigo-300 transition-all cursor-pointer group">
            <input 
              type="checkbox" 
              name="isAvailable" 
              checked={formData.isAvailable} 
              onChange={handleInputChange}
              className="w-6 h-6 text-indigo-600 rounded-xl focus:ring-indigo-500 bg-white shadow-lg transform group-hover:scale-110 transition-all"
            />
            <span className="text-lg font-bold text-gray-800 select-none">
              Make Available for Orders Immediately
            </span>
          </label>

          {/* Submit Button */}
          {/* <button
  type="submit"
  disabled={loading}   
  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-3xl"
>
            {loading ? (
              <>
                <div className="w-6 h-6 border-3 border-white/80 border-t-transparent rounded-full animate-spin"></div>
                <span>Adding Delicious Dish...</span>
              </>
            ) : (
              <>
                <FaPlus className="w-6 h-4 group-hover:rotate-90 transition-transform duration-300" />
                <span>  Add to Menu</span>
              </>
            )}
          </button> */}



          <button
  type="submit"
  disabled={loading}
  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-3xl flex items-center justify-center gap-3"
>
  {loading ? (
    <>
      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      <span className="whitespace-nowrap">Adding Delicious Dish...</span>
    </>
  ) : (
    <>
      <FaPlus className="w-5 h-5 transition-transform duration-300" />
      <span className="whitespace-nowrap">Add to Menu</span>
    </>
  )}
</button>
        </form>

        {/* Back Link */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/seller-dashboard')}
            className="text-indigo-600 hover:text-indigo-700 font-bold text-lg underline hover:no-underline transition-all"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItems;