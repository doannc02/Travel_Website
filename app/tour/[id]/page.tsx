"use client"
import { useState } from 'react';
import { MotionDiv, MotionH2, MotionH3, MotionP, MotionButton } from '../../components/common/MotionWrapper';
import { useParams } from 'next/navigation';

export default function TourDetailPage() {
  const params = useParams();
  const tourId = params.id;
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock tour data - in real app, fetch from API
  const tourData = {
    id: tourId,
    title: "Combo Phú Quốc 3N2Đ - Khám phá đảo ngọc",
    subtitle: "Khách sạn 4★ + Vé máy bay + Ăn sáng + Tour khám phá",
    images: [
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1200&h=800&fit=crop"
    ],
    price: 2990000,
    originalPrice: 4290000,
    discount: "30%",
    duration: "3 ngày 2 đêm",
    groupSize: "2-8 người",
    rating: 4.8,
    reviewCount: 1247,
    location: "Phú Quốc, Việt Nam",
    highlights: [
      "Khách sạn 4 sao view biển",
      "Vé máy bay khứ hồi",
      "Ăn sáng buffet hàng ngày",
      "Tour khám phá đảo",
      "Đưa đón sân bay",
      "Hướng dẫn viên tiếng Việt"
    ],
    itinerary: [
      {
        day: 1,
        title: "Khởi hành - Check-in khách sạn",
        activities: [
          "Đón tại sân bay Phú Quốc",
          "Check-in khách sạn 4 sao",
          "Ăn tối tại nhà hàng khách sạn",
          "Nghỉ đêm tại Phú Quốc"
        ]
      },
      {
        day: 2,
        title: "Khám phá đảo Phú Quốc",
        activities: [
          "Ăn sáng buffet",
          "Tour khám phá Bãi Khem",
          "Thăm Vịnh Đá Vàng",
          "Ăn trưa tại nhà hàng địa phương",
          "Chợ đêm Dinh Cậu",
          "Nghỉ đêm tại khách sạn"
        ]
      },
      {
        day: 3,
        title: "VinWonders - Khởi hành về",
        activities: [
          "Ăn sáng buffet",
          "Vui chơi tại VinWonders",
          "Ăn trưa tại công viên",
          "Check-out khách sạn",
          "Đưa ra sân bay",
          "Khởi hành về"
        ]
      }
    ],
    inclusions: [
      "Vé máy bay khứ hồi",
      "Khách sạn 4 sao 2 đêm",
      "Ăn sáng buffet hàng ngày",
      "Đưa đón sân bay",
      "Hướng dẫn viên",
      "Bảo hiểm du lịch",
      "Nước uống trên xe"
    ],
    exclusions: [
      "Ăn trưa, tối",
      "Chi phí cá nhân",
      "Tip cho hướng dẫn viên",
      "Phụ phí phát sinh"
    ],
    policies: [
      "Hủy tour trước 7 ngày: hoàn 100%",
      "Hủy tour trước 3 ngày: hoàn 50%",
      "Hủy tour trong 3 ngày: không hoàn",
      "Thay đổi ngày đi: phí 200.000đ"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image Gallery */}
      <section className="relative h-96 lg:h-[600px] overflow-hidden">
        {/* Main Image */}
        <img 
          src={tourData.images[selectedImage]} 
          alt={tourData.title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Back Button */}
        <MotionButton
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ←
        </MotionButton>

        {/* Image Gallery Thumbnails */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {tourData.images.map((image, index) => (
              <MotionButton
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index ? 'border-white' : 'border-white/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img 
                  src={image} 
                  alt={`Tour image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </MotionButton>
            ))}
          </div>
        </div>

        {/* Tour Info Overlay */}
        <div className="absolute bottom-6 right-6 text-right text-white">
          <MotionH2 className="text-3xl lg:text-4xl font-bold mb-2">
            {tourData.title}
          </MotionH2>
          <MotionP className="text-lg opacity-90 mb-2">
            {tourData.location} • {tourData.duration}
          </MotionP>
          <div className="flex items-center justify-end space-x-2 mb-2">
            <span className="text-yellow-400">⭐</span>
            <span className="font-semibold">{tourData.rating}</span>
            <span className="opacity-80">({tourData.reviewCount} đánh giá)</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tour Details */}
          <div className="lg:col-span-2">
            {/* Price Card */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-red-600">
                    {tourData.price.toLocaleString()}đ
                  </div>
                  <div className="text-lg text-gray-400 line-through">
                    {tourData.originalPrice.toLocaleString()}đ
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{tourData.discount}
                  </span>
                  <div className="text-sm text-gray-600 mt-1">
                    {tourData.duration}
                  </div>
                </div>
              </div>
              
              <MotionButton
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Đặt tour ngay
              </MotionButton>
            </MotionDiv>

            {/* Tabs Navigation */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg mb-8"
            >
              <div className="flex border-b">
                {[
                  { id: 'overview', label: 'Tổng quan', icon: '📋' },
                  { id: 'itinerary', label: 'Lịch trình', icon: '🗓️' },
                  { id: 'inclusions', label: 'Bao gồm', icon: '✅' },
                  { id: 'policies', label: 'Chính sách', icon: '📋' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-medium transition-colors ${
                      activeTab === tab.id 
                        ? 'text-red-600 border-b-2 border-red-600' 
                        : 'text-gray-600 hover:text-red-600'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <MotionDiv
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div>
                      <MotionH3 className="text-xl font-bold text-gray-900 mb-3">
                        Mô tả tour
                      </MotionH3>
                      <MotionP className="text-gray-700 leading-relaxed">
                        {tourData.subtitle}
                      </MotionP>
                    </div>

                    <div>
                      <MotionH3 className="text-xl font-bold text-gray-900 mb-3">
                        Điểm nổi bật
                      </MotionH3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {tourData.highlights.map((highlight, index) => (
                          <MotionDiv
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <span className="text-green-500 text-xl">✓</span>
                            <span className="text-gray-700">{highlight}</span>
                          </MotionDiv>
                        ))}
                      </div>
                    </div>
                  </MotionDiv>
                )}

                {activeTab === 'itinerary' && (
                  <MotionDiv
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {tourData.itinerary.map((day, index) => (
                      <MotionDiv
                        key={day.day}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-l-4 border-red-500 pl-6"
                      >
                        <div className="mb-3">
                          <MotionH3 className="text-lg font-bold text-gray-900">
                            Ngày {day.day}: {day.title}
                          </MotionH3>
                        </div>
                        <ul className="space-y-2">
                          {day.activities.map((activity, actIndex) => (
                            <li key={actIndex} className="flex items-start space-x-3">
                              <span className="text-red-500 text-sm mt-1">•</span>
                              <span className="text-gray-700">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </MotionDiv>
                    ))}
                  </MotionDiv>
                )}

                {activeTab === 'inclusions' && (
                  <MotionDiv
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div>
                      <MotionH3 className="text-xl font-bold text-gray-900 mb-3 text-green-600">
                        Bao gồm
                      </MotionH3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {tourData.inclusions.map((item, index) => (
                          <MotionDiv
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <span className="text-green-500 text-xl">✓</span>
                            <span className="text-gray-700">{item}</span>
                          </MotionDiv>
                        ))}
                      </div>
                    </div>

                    <div>
                      <MotionH3 className="text-xl font-bold text-gray-900 mb-3 text-red-600">
                        Không bao gồm
                      </MotionH3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {tourData.exclusions.map((item, index) => (
                          <MotionDiv
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <span className="text-red-500 text-xl">✗</span>
                            <span className="text-gray-700">{item}</span>
                          </MotionDiv>
                        ))}
                      </div>
                    </div>
                  </MotionDiv>
                )}

                {activeTab === 'policies' && (
                  <MotionDiv
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    {tourData.policies.map((policy, index) => (
                      <MotionDiv
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-50 p-4 rounded-lg"
                      >
                        <span className="text-gray-700">{policy}</span>
                      </MotionDiv>
                    ))}
                  </MotionDiv>
                )}
              </div>
            </MotionDiv>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <MotionDiv
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-6"
            >
              <MotionH3 className="text-xl font-bold text-gray-900 mb-4">
                Đặt tour
              </MotionH3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày khởi hành
                  </label>
                  <input 
                    type="date" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số người
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option>2 người</option>
                    <option>4 người</option>
                    <option>6 người</option>
                    <option>8 người</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại phòng
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option>Phòng đôi</option>
                    <option>Phòng đơn</option>
                    <option>Phòng gia đình</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Giá tour:</span>
                  <span>{tourData.price.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Phí dịch vụ:</span>
                  <span>150.000đ</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-red-600">
                  <span>Tổng cộng:</span>
                  <span>{(tourData.price + 150000).toLocaleString()}đ</span>
                </div>
              </div>

              <MotionButton
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Đặt tour ngay
              </MotionButton>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Hoặc gọi: <span className="text-red-600 font-semibold">1900 1234</span>
                </p>
              </div>
            </MotionDiv>
          </div>
        </div>
      </div>
    </div>
  );
} 