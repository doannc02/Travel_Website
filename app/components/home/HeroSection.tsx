"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "../common/SearchBar";
import { Hotel } from "@prisma/client/wasm";

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const images = [
    "/images/hero-bg1.jpg",
    "/images/hero-bg2.jpg",
    "/images/hero-bg3.jpg"
  ];

  // Lấy danh sách khách sạn nổi bật
  async function fetchFeaturedHotels() {
    try {
      const res = await fetch("/api/hotels");
      const data = await res.json();
      if (data.success) {
        setHotels(data.data);
      }
    } catch (error) {
      console.error("Fetch hotels error:", error);
    }
  }

  useEffect(() => {
    fetchFeaturedHotels();
  }, []);

  // Xử lý tìm kiếm
  const handleSearch = () => {
    // Chuyển hướng đến trang tìm kiếm với query
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Background Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${images[currentImage]})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        {/* Hero Content */}
        <div className="max-w-2xl">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Khám phá điểm đến tuyệt vời nhất
          </motion.h1>

          <motion.p
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-white mb-8"
          >
            Tìm kiếm và đặt phòng khách sạn với giá tốt nhất
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative"
          >
            <div className="flex">
              <input
                type="text"
                placeholder="Tìm kiếm điểm đến, khách sạn..."
                className="w-full px-6 py-4 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-r-lg font-semibold transition-colors"
              >
                Tìm kiếm
              </button>
            </div>
          </motion.div>
        </div>

        {/* Featured Hotels Carousel */}
        {hotels.length > 0 && (
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm py-6"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="container mx-auto px-4">
              <h3 className="text-white text-xl font-semibold mb-4">Khách sạn nổi bật</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hotels.slice(0, 4).map((hotel) => (
                  <div 
                    key={hotel.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="h-32 relative">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
                        -{hotel.discount}
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold text-sm line-clamp-1">{hotel.name}</h4>
                      <p className="text-gray-600 text-xs">{hotel.location}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-red-600 font-bold text-sm">
                          {hotel.price.toLocaleString()}đ
                        </span>
                        <button className="text-blue-600 text-xs font-semibold hover:underline">
                          Chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}