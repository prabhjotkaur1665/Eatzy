// import React from "react";
// import Header from "../components/Header/Header";  // आपका Header

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100">

//       <Header />
      
     
//     </div>
//   );
// };

// export default Home;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";  
import ImageGallary from "./user/ImageGallary";

const Home = () => {
  const navigate = useNavigate();
  const [isSeller, setIsSeller] = useState(false);

  
useEffect(() => {

const checkSeller = async () => {
  try {
   
    const userRes = await axios.get("http://localhost:5000/api/users/profile", {
      withCredentials: true
    });

    if (userRes.data.success) {
      setIsSeller(false);
      return;
    }

    const response = await axios.get("http://localhost:5000/api/seller/profile", {
      withCredentials: true
    });

    setIsSeller(response.data.success);

  } catch {
    setIsSeller(false);
  }
};
  checkSeller();
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      
      <div className="min-h-fit bg-gradient-to-br from-slate-50 to-indigo-100">
        <Header />
      </div>
        <ImageGallary/>

      {/*Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-amber-400/20 to-yellow-400/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent drop-shadow-4xl mb-8">
            Eatzy
          </h1>

          <p className="text-3xl md:text-4xl text-gray-800 font-bold mb-12 max-w-4xl mx-auto drop-shadow-xl">
            Delicious food delivered to your doorstep
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
            
            <a 
              href="/menu" 
              className="group bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-12 py-6 rounded-3xl text-2xl font-black shadow-3xl hover:shadow-4xl hover:-translate-y-2 transition-all duration-500 flex items-center gap-4"
            >
            Order Now
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </a>

            {isSeller && (
              <a 
                href="/seller-dashboard" 
                className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-12 py-6 rounded-3xl text-2xl font-black shadow-3xl hover:shadow-4xl hover:-translate-y-2 transition-all duration-500 flex items-center gap-4"
              >
                 Seller Panel
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Seller Call to Action */}
      {isSeller && (
        <section className="py-24 px-6 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-5xl font-black text-gray-900 mb-6">
              Ready to start selling? 
            </h3>

            <p className="text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Join thousands of restaurants earning with Eatzy
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="/add-items" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-12 py-6 rounded-4xl text-2xl font-black shadow-3xl hover:shadow-4xl hover:-translate-y-2 transition-all">
                 Add First Item
              </a>

              <a href="/seller-dashboard" className="border-4 border-emerald-400 hover:border-emerald-500 text-emerald-700 hover:text-emerald-800 px-12 py-6 rounded-4xl text-2xl font-black shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all bg-white">
                 Dashboard
              </a>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default Home;





