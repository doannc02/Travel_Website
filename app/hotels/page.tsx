"use client";
import { useState, useEffect } from "react";
import {
  MotionDiv,
  MotionH2,
  MotionP,
  MotionButton,
} from "../components/common/MotionWrapper";
import { useApi } from "../hooks/useApi";

interface Hotel {
  id: number;
  name: string;
  image: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number;
  discount: string;
  amenities: string[];
  roomTypes: string[];
  description: string;
}

export default function HotelsPage() {
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [rating, setRating] = useState("all");

  const locations = [
    "all",
    "Phú Quốc",
    "Đà Nẵng",
    "Nha Trang",
    "Sapa",
    "Hà Nội",
    "TP.HCM",
  ];
  const priceRanges = [
    { value: "all", label: "Tất cả giá" },
    { value: "budget", label: "Dưới 1 triệu" },
    { value: "mid", label: "1-3 triệu" },
    { value: "high", label: "3-5 triệu" },
    { value: "luxury", label: "Trên 5 triệu" },
  ];
  const ratings = [
    { value: "all", label: "Tất cả đánh giá" },
    { value: "4.5", label: "4.5+ sao" },
    { value: "4.0", label: "4.0+ sao" },
    { value: "3.5", label: "3.5+ sao" },
  ];

  // Use API hook
  const {
    data: hotels,
    loading,
    error,
    total,
    fetchData,
  } = useApi<Hotel[]>("/api/hotels", {
    immediate: false,
  });

  // Fetch data when filters change
  useEffect(() => {
    fetchData({
      location: selectedLocation,
      priceRange,
      rating,
    });
  }, [selectedLocation, priceRange, rating]);

  const handleBooking = async (hotelId: number) => {
    try {
      const response = await fetch('/api/hotels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Nếu có auth
        },
        body: JSON.stringify({
          hotelId,
          userId: "user123", // Trong thực tế lấy từ auth context
          checkIn: new Date().toISOString().split('T')[0], // Ngày hôm nay
          checkOut: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 ngày sau
          guests: 2,
          totalPrice: hotels?.find(h => h.id === hotelId)?.price || 0,
        }),
      });
  
      const result = await response.json();
      
      if (result.success) {
        alert(result.message || 'Đặt phòng thành công!');
      } else {
        throw new Error(result.message || 'Đặt phòng thất bại');
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Có lỗi xảy ra khi đặt phòng');
    }
  };

  const handleSearch = () => {
    fetchData({
      location: selectedLocation,
      priceRange,
      rating,
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Có lỗi xảy ra khi tải dữ liệu
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => fetchData({
              location: selectedLocation !== 'all' ? selectedLocation : undefined,
              priceRange: priceRange !== 'all' ? priceRange : undefined,
              rating: rating !== 'all' ? rating : undefined,
            })}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Khách sạn tuyệt vời
          </h1>
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto"
          >
            Khám phá những khách sạn đẳng cấp với dịch vụ hoàn hảo và vị trí lý
            tưởng
          </MotionP>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Địa điểm
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location === "all" ? "Tất cả địa điểm" : location}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Khoảng giá
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Đánh giá
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {ratings.map((ratingOption) => (
                  <option key={ratingOption.value} value={ratingOption.value}>
                    {ratingOption.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <MotionButton
                onClick={handleSearch}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? "Đang tìm..." : "Tìm kiếm"}
              </MotionButton>
            </div>
          </div>
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải dữ liệu khách sạn...</p>
            </div>
          ) : (
            <>
              <MotionH2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-gray-900 mb-12 text-center"
              >
                {total} khách sạn được tìm thấy
              </MotionH2>

              {hotels && hotels.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {hotels.map((hotel, index) => (
                    <MotionDiv
                      key={hotel.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2"
                    >
                      {/* Hotel Image */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          GIẢM {hotel.discount}
                        </div>
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-400">⭐</span>
                            <span className="font-bold text-gray-900">
                              {hotel.rating}
                            </span>
                            <span className="text-gray-600 text-sm">
                              ({hotel.reviewCount.toLocaleString()})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Hotel Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {hotel.name}
                        </h3>
                        <p className="text-gray-600 mb-4 flex items-center">
                          <span className="text-blue-500 mr-2">📍</span>
                          {hotel.location}
                        </p>

                        {/* Price */}
                        <div className="mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl font-bold text-red-600">
                              {hotel.price.toLocaleString()}đ
                            </span>
                            <span className="text-lg text-gray-500 line-through">
                              {hotel.originalPrice.toLocaleString()}đ
                            </span>
                          </div>
                          <span className="text-sm text-gray-600">/đêm</span>
                        </div>

                        {/* Amenities */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Tiện ích nổi bật
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                              <span
                                key={idx}
                                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Room Types */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Loại phòng
                          </h4>
                          <div className="grid grid-cols-1 gap-2">
                            {hotel.roomTypes.map((roomType, idx) => (
                              <div
                                key={idx}
                                className="flex items-center space-x-2 text-sm text-gray-600"
                              >
                                <span className="text-green-500">🛏️</span>
                                <span>{roomType}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex space-x-3">
                          <MotionButton
                            onClick={() => handleBooking(hotel.id)}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Đặt ngay
                          </MotionButton>
                          <MotionButton
                            className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Chi tiết
                          </MotionButton>
                        </div>
                      </div>
                    </MotionDiv>
                  ))}
                </div>
              ) : (
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <div className="text-6xl mb-4">🏨</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Không tìm thấy khách sạn
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Hãy thử thay đổi bộ lọc để tìm kiếm khách sạn phù hợp
                  </p>
                  <MotionButton
                    onClick={() => {
                      setSelectedLocation("all");
                      setPriceRange("all");
                      setRating("all");
                    }}
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Xóa bộ lọc
                  </MotionButton>
                </MotionDiv>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
