import React, { useState } from "react";
import ImageTagger from "./imagetagger";
import Navbar from "./navbar";
import Footer from "./footer";
import sneakers from "./assets/sneakers.png"; 
import sw from "./assets/sw.png"; 
import herosectionimg from "./assets/herosectionimg.png"; 
import womendress from "./assets/womendress.png"; 
import headphones from "./assets/headphones.png"; // Example import, adjust as needed
import "./App.css";// Import your global styles

const trending = [
  { name: "Headphones", img: headphones },
  { name: "Sneakers", img: sneakers },
  { name: "Smart Watches", img: sw },
  { name: "Women's Dress", img: womendress },
];

const features = [
  {
    icon: "📸",
    title: "Snap a Photo",
    desc: "Upload any product image and let our AI recognize it instantly.",
  },
  {
    icon: "🤖",
    title: "AI Finds Matches",
    desc: "Our smart engine searches Amazon for the best deals and matches.",
  },
  {
    icon: "⚡",
    title: "Shop Instantly",
    desc: "Go straight to the product page and buy with one click.",
  },
];

const testimonials = [
  {
    name: "Ava",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "I found my dream shoes in seconds! The image search is magic.",
  },
  {
    name: "Liam",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Super easy to use and the results are spot on. Love it!",
  },
  {
    name: "Sophia",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "The trending categories are always fresh. Shopping made fun!",
  },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [amazonResults, setAmazonResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageTaggerSearch = async (tags) => {
    setSearch(tags);
    setShowResults(true);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: tags }),
      });
      const data = await response.json();
      setAmazonResults(data.organic_results || []);
    } catch (err) {
      setAmazonResults([]);
    }
    setLoading(false);
  };

  const handleTrendingClick = (name) => {
    setSearch(name);
    setShowResults(true);
    setLoading(true);
    fetch("http://localhost:5000/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: name }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAmazonResults(data.organic_results || []);
        setLoading(false);
      })
      .catch(() => {
        setAmazonResults([]);
        setLoading(false);
      });
  };

  const handleBack = () => {
    setShowResults(false);
    setAmazonResults(null);
    setSearch("");
  };

  return (
  <div className="flex flex-col min-h-screen bg-[#ffefef]">
      <Navbar />
      <div className="w-full flex justify-center mt-8">
        <div className="w-full max-w-xl">
          <ImageTagger onSearch={handleImageTaggerSearch} />
        </div>
      </div>
      {showResults ? (
        // Results Page
        <main className="flex flex-col items-center flex-1 w-full">
          <div className="w-full flex flex-col items-center mt-10 px-2">
            <div className="text-2xl mb-6 font-semibold text-gray-700">
              Search results for <span className="text-indigo-600">{search}</span>
            </div>
            <div className="w-full max-w-6xl">
              {loading && <div className="text-center text-lg">Loading...</div>}
              {!loading && amazonResults && amazonResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {amazonResults.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-white rounded-2xl shadow hover:shadow-xl transition p-5 h-full border border-gray-100 hover:border-indigo-300"
                      title={item.title}
                    >
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-44 object-contain mb-4 rounded"
                        />
                      ) : (
                        <div className="w-full h-44 flex items-center justify-center bg-gray-100 mb-4 rounded text-4xl text-gray-300">
                          🛒
                        </div>
                      )}
                      <div className="font-bold text-base mb-1 line-clamp-2">{item.title}</div>
                      {item.price && (
                        <div className="text-green-700 font-semibold mb-1">{item.price}</div>
                      )}
                      {item.rating && (
                        <div className="text-yellow-600 mb-1 text-sm">
                          ⭐ {item.rating} {item.reviews ? `(${item.reviews})` : ""}
                        </div>
                      )}
                      <div className="text-blue-600 underline mt-2 text-sm">View on Amazon</div>
                    </a>
                  ))}
                </div>
              ) : (
                !loading && (
                  <div className="text-center text-gray-500 text-lg mt-8">
                    No results found.
                  </div>
                )
              )}
            </div>
            <button
              className="mt-10 px-8 py-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-full font-semibold transition"
              onClick={handleBack}
            >
              ← Back to Home
            </button>
          </div>
        </main>
      ) : (
        // Homepage Content
        
        <main className="flex flex-col items-center flex-1 py-16 w-full">
          {/* Hero Section */}
           <div className="font-extrabold text-6xl md:text-4xl mb-8 bg-gradient-to-r from-yellow-400 via-pink-400 to-fuchsia-500 bg-clip-text text-transparent tracking-widest drop-shadow">
      SNAP IT, SHOP IT.
    </div>
          <section id="hero" className="w-98% flex flex-col md:flex-row items-center rounded-xl justify-between py-16 bg-[#ffa8a8eb] shadow mb-8">
            <div className="flex-1 text-center md:text-left mb-10 md:mb-0">
              
              <h1 className="text-5xl font-extrabold mb-4 text-gray-800 tracking-tight">
                Shop Smarter with AI
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Snap a photo or search a trend. Discover the best Amazon deals in seconds.
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <img
                src={herosectionimg}
                alt="Shopping Illustration"
                className="w-96 max-w-full"
                loading="lazy"
              />
            </div>
          </section>

          {/* Features Section */}
          <section className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-8 mb-16">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl shadow p-8 flex flex-col items-center text-center hover:shadow-lg transition">
                <div className="text-5xl mb-4">{f.icon}</div>
                <div className="font-bold text-xl mb-2">{f.title}</div>
                <div className="text-gray-500">{f.desc}</div>
              </div>
            ))}
          </section>

          {/* Trending Section */}
          <section className="w-full max-w-6xl mx-auto px-8 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Trending Now</h2>
            <div className="flex gap-6 overflow-x-auto pb-2">
              {trending.map((trend, i) => (
                <button
                  key={trend.name}
                  className="flex-shrink-0 bg-transparent rounded-xl  transition p-4 flex flex-col items-center min-w-[140px]  border-none hover:border-indigo-300"
                  onClick={() => handleTrendingClick(trend.name)}
                >
                  <img
                    src={trend.img}
                    alt={trend.name}
                    className="w-20 h-20 object-cover rounded mb-2"
                    loading="lazy"
                  />
                  <span className="font-semibold">{trend.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="w-90% rounded-xl mx-auto px-8 mb-16 bg-[#ffa8a8]">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">What Shoppers Say</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-16 h-16 rounded-full mb-3 border-2 border-indigo-200"
                    loading="lazy"
                  />
                  <div className="italic text-gray-600 mb-2">"{t.text}"</div>
                  <div className="font-bold text-indigo-700">{t.name}</div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}
     {/* <Footer /> */}
    </div>
  );
}