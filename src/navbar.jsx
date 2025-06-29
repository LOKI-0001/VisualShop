import React from "react";
import { FiSearch, FiMenu } from "react-icons/fi";

const Navbar = () => {
    return (
        <nav className="w-full h-16 bg-white/70 backdrop-blur-xl shadow-xl border-b border-indigo-100 z-[1000]">
            <div className="max-w-[1300px] mx-auto flex items-center justify-between px-6 py-3">
                {/* Mobile Menu Icon */}
                <button className="md:hidden text-[#ffa8a8] text-2xl mr-2">
                    <FiMenu />
                </button>
                {/* Logo & Brand */}
                <a href="/" id="logo" className="flex items-center gap-2 font-extrabold text-2xl text-indigo-700 tracking-wide hover:scale-105 transition">
                    <img
                        src="https://img.icons8.com/color/48/000000/shopping-cart--v2.png"
                        alt="logo"
                        className="w-9 h-9 drop-shadow"
                    />
                    <span className="drop-shadow">VisualShop</span>
                </a>
                {/* Navigation Links */}
                <div className="hidden md:flex gap-8 text-gray-700 font-medium text-xl ml-10">
                    <a href="#features" className="hover:text-[#ff6363] transition">Features</a>
                    <a href="#trending" className="hover:text-[#ff6363] transition">Trending</a>
                    <a href="#testimonials" className="hover:text-[#ff6363] transition">Testimonials</a>
                </div>
                {/* Right Side: Search, CTA, Profile */}
                <div className="flex items-center gap-3">
                    <button className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-indigo-50 transition">
                        <FiSearch className="text-xl text-indigo-500" />
                    </button>
                    <a
                        href="#"
                        className="hidden md:inline-block px-5 py-2 rounded-full bg-[#ff6363] text-white font-semibold shadow hover:bg-[#ff4f4f] transition"
                    >
                        Get Started
                    </a>
                    <button
                        className="inline-flex w-10 h-10 rounded-full bg-gradient-to-br from-[#6e8efb] to-[#a777e3] items-center justify-center text-white font-bold text-lg shadow-md hover:scale-105 transition border-2 border-white"
                        title="User Profile"
                    >
                        <img
                            src="https://randomuser.me/api/portraits/men/32.jpg"
                            alt="User"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;