import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assests";

const Header = () => {

  const navigate = useNavigate();

  return (
    <>

 <style>{`
                @keyframes rotate {
                    100% {
                        transform: rotate(1turn);
                    }
                }
            
                .rainbow::before {
                    content: '';
                    position: absolute;
                    z-index: -2;
                    left: -50%;
                    top: -50%;
                    width: 200%;
                    height: 200%;
                    background-position: 100% 50%;
                    background-repeat: no-repeat;
                    background-size: 50% 30%;
                    filter: blur(6px);
                    background-image: linear-gradient(#FFF);
                    animation: rotate 4s linear infinite;
                }
            `}</style>

      <div className="relative w-full h-[400px] rounded-2xl mb-12 mt-16 rounded-2xl">

        {/* Background */}
        <img
          src={assets.hero}
          alt="food"
          className="w-full h-full object-cover rounded-2xl"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>

        {/* Text */}
        <div className="absolute inset-0 flex flex-col justify-center px-16 text-white">

          <h1 className="text-5xl font-bold mb-4 leading-tight">
            Order your <br /> favourite food here
          </h1>

          <p className="max-w-xl mb-6 text-lg">
            Choose from a diverse menu featuring a delectable array of dishes.
            Our mission is to satisfy your cravings and elevate your dining experience.
          </p>

          {/* Button */}
            <div className="rainbow relative w-35 z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
  <button
    onClick={() => navigate("/menu")}
    className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur"
  >
    View Menu
  </button>
</div>

        </div>
      </div>
    </>
  );
};

export default Header;