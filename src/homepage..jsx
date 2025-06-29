import React, { useState } from "react";
import ImageTagger from "./imagetagger";
import Navbar from "./navbar";
import Footer from "./footer";
import sneakers from "./assets/sneakers.png"; 
import sw from "./assets/sw.png"; 
import toys from "./assets/toys.png"; 
import herosectionimg from "./assets/herosectionimg.png"; 
import womendress from "./assets/womendress.png"; 
import headphones from "./assets/headphones.png";
import mendress1 from "./assets/mendress1.png";
import "./App.css";

const trending = [
  { name: "Headphones", img: headphones },
  { name: "Sneakers", img: sneakers },
  { name: "Smart Watches", img: sw },
  { name: "Women's Fashion", img: womendress },
  { name: "Men's Fashion", img: mendress1 },
  { name: "Toys", img: toys },
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

  // Filter state
  const [minRating, setMinRating] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 100000]);

  // Save recent searches to localStorage for personalization
  const saveRecentSearch = (query) => {
    let recent = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    recent = [query, ...recent.filter((q) => q !== query)].slice(0, 5); // unique, max 5
    localStorage.setItem("recentSearches", JSON.stringify(recent));
  };

  const handleImageTaggerSearch = async (tags) => {
    setSearch(tags);
    setShowResults(true);
    setLoading(true);
    saveRecentSearch(tags);
    try {
      const response = await fetch("https://visualshop-1.onrender.com/search", {
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
    saveRecentSearch(name);
    fetch("https://visualshop-1.onrender.com/search", {
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

  // Get recent searches for recommendations
  const recentSearches = JSON.parse(localStorage.getItem("recentSearches") || "[]");

  // Filtered results
  const filteredResults = amazonResults
    ? amazonResults.filter(item => {
        // Rating filter
        const rating = parseFloat(item.rating) || 0;
        if (rating < minRating) return false;
        // Price filter (extract number from string like "₹1,234")
        const priceMatch = item.price && item.price.match(/\d[\d,]*/);
        const price = priceMatch ? parseInt(priceMatch[0].replace(/,/g, "")) : 0;
        if (price < priceRange[0] || price > priceRange[1]) return false;
        return true;
      })
    : [];

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
              {/* Filter Controls */}
              {amazonResults && amazonResults.length > 0 && (
                <div className="flex gap-6 mb-6 items-center">
                  <label className="flex items-center gap-2">
                    Min Rating:
                    <select
                      value={minRating}
                      onChange={e => setMinRating(Number(e.target.value))}
                      className="border rounded px-2 py-1"
                    >
                      <option value={0}>Any</option>
                      <option value={3}>3+</option>
                      <option value={4}>4+</option>
                      <option value={4.5}>4.5+</option>
                    </select>
                  </label>
                  <label className="flex items-center gap-2">
                    Price Range:
                    <input
                      type="number"
                      min={0}
                      value={priceRange[0]}
                      onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="border rounded px-2 py-1 w-20"
                    />
                    -
                    <input
                      type="number"
                      min={0}
                      value={priceRange[1]}
                      onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="border rounded px-2 py-1 w-20"
                    />
                  </label>
                </div>
              )}
              {loading && <div className="text-center text-lg">Loading...</div>}
              {!loading && filteredResults && filteredResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {filteredResults.map((item, idx) => (
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
          <div id="tagline" className="font-extrabold text-8xl md:text-4xl pb-10 bg-gradient-to-r from-yellow-400 via-pink-400 to-fuchsia-500 bg-clip-text text-transparent tracking-widest drop-shadow">
            SNAP IT, SHOP IT.
          </div>
          <section id="hero" className="w-90% mx-auto px-8  bg-[#ffa8a8] flex flex-col md:flex-row items-center rounded-xl justify-between py-16 bg-[#ffa8a8eb] shadow mb-8">
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

          {/* Personalized Recommendations Section */}
          <section className="w-full max-w-6xl mx-auto px-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Recommended for You</h2>
            <div className="flex gap-4 flex-wrap">
              {recentSearches.length === 0 ? (
                <div className="text-gray-500">Your recommendations will appear here as you search.</div>
              ) : (
                recentSearches.map((q) => (
                  <button
                    key={q}
                    className="bg-white rounded-xl shadow px-6 py-3 font-semibold text-indigo-700 hover:bg-indigo-50 transition"
                    onClick={() => handleTrendingClick(q)}
                  >
                    {q}
                  </button>
                ))
              )}
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-8 mb-16">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl shadow p-8 flex flex-col items-center text-center hover:shadow-lg transition">
                <div className="text-5xl mb-4">{f.icon}</div>
                <div className="font-bold text-xl mb-2">{f.title}</div>
                <div className="text-gray-500">{f.desc}</div>
              </div>
            ))}
          </section>

          {/* Trending Section */}
          <section id="trending" className="w-full max-w-6xl mx-auto px-8 mb-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Trending Now</h2>
            <div className="flex gap-6 overflow-x-auto pb-2 trending-scrollbar">
              {trending.map((trend, i) => (
                <button
                  key={trend.name}
                  className="flex-shrink-0 bg-transparent rounded-xl  transition p-4 flex flex-col items-center min-w-[140px]  border-none hover:border-indigo-300"
                  onClick={() => handleTrendingClick(trend.name)}
                >
                  <img
                    src={trend.img}
                    alt={trend.name}
                    className="w-30 h-20 object-cover rounded mb-2"
                    loading="lazy"
                  />
                  <span className="font-semibold text-2xl">{trend.name}</span>
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