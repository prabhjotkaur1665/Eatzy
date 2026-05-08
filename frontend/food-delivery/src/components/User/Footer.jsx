import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2d2d2d] text-gray-300 pt-14 pb-6 mt-20">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-40 ml-20">

        {/* Left Section */}
        <div>
          <h1 className="text-3xl font-bold text-orange-500 mb-4">
            EATZY
          </h1>

          <p className="text-sm leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>

          <div className="flex gap-7 mt-6">

            <div className="border border-gray-500 p-2 rounded-full cursor-pointer hover:bg-gray-700">
              <FaFacebookF size={14}/>
            </div>

            <div className="border border-gray-500 p-2 rounded-full cursor-pointer hover:bg-gray-700">
              <FaTwitter size={14}/>
            </div>

            <div className="border border-gray-500 p-2 rounded-full cursor-pointer hover:bg-gray-700">
              <FaLinkedinIn size={14}/>
            </div>

          </div>
        </div>

        {/* Company Section */}
        <div > 
          <h2 className="text-white font-semibold mb-4">
            COMPANY
          </h2>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About us</li>
            <li className="hover:text-white cursor-pointer">Delivery</li>
            <li className="hover:text-white cursor-pointer">Privacy policy</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div> 
          <h2 className="text-white font-semibold mb-4">
            GET IN TOUCH
          </h2>

          <p className="text-sm mb-2">+1-212-4560-7890</p>
          <p className="text-sm">contact@greatstack.dev</p>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-600 mt-10 pt-6 text-center text-sm">
        Copyright 2024 © Eatzy.com - All Right Reserved.
      </div>

    </footer>
  );
};

export default Footer;