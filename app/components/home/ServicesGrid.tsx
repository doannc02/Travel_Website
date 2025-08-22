"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Hotel,
  Plane,
  Map,
  ShoppingBag,
  Coffee,
  Camera,
  Car,
  Mountain,
  Utensils,
  Ticket,
  Users,
  MapPin,
  Star,
  Clock,
  ArrowRight,
  Calendar,
  Shield,
  Heart,
  Zap,
  Globe,
} from "lucide-react";

export default function ModernServicesSection() {
  const router = useRouter();
  const [activeService, setActiveService] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const mainServices = [
    {
      id: 1,
      name: "Khách sạn & Resort",
      description: "Tìm kiếm và đặt phòng khách sạn tốt nhất",
      icon: Hotel,
      link: "/hotels",
      color: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-50",
      stats: "50,000+ khách sạn",
      features: ["Giá tốt nhất", "Đặt ngay - Trả sau", "Hủy miễn phí"],
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Vé máy bay",
      description: "Đặt vé máy bay giá rẻ toàn cầu",
      icon: Plane,
      link: "/flights",
      color: "from-green-500 to-emerald-700",
      bgColor: "bg-green-50",
      stats: "500+ hãng bay",
      features: ["So sánh giá", "Checkin online", "Bảo hiểm chuyến bay"],
      image:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      name: "Tour du lịch",
      description: "Khám phá những điểm đến tuyệt vời",
      icon: Map,
      link: "/packages",
      color: "from-purple-500 to-indigo-700",
      bgColor: "bg-purple-50",
      stats: "1,000+ tour",
      features: ["Hướng dẫn viên", "All-inclusive", "Nhóm nhỏ"],
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      name: "Thuê xe",
      description: "Thuê xe tự lái và có tài xế",
      icon: Car,
      link: "/car-rental",
      color: "from-red-500 to-pink-700",
      bgColor: "bg-red-50",
      stats: "24/7 hỗ trợ",
      features: ["Bảo hiểm toàn diện", "Giao xe tận nơi", "Giá cả minh bạch"],
      image:
        "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 5,
      name: "Ẩm thực địa phương",
      description: "Khám phá văn hóa ẩm thực",
      icon: Utensils,
      link: "/dining",
      color: "from-orange-500 to-yellow-600",
      bgColor: "bg-orange-50",
      stats: "5,000+ nhà hàng",
      features: ["Đặt bàn online", "Review chân thực", "Ưu đãi độc quyền"],
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 6,
      name: "Hoạt động & Giải trí",
      description: "Trải nghiệm thú vị tại điểm đến",
      icon: Mountain,
      link: "/activities",
      color: "from-teal-500 to-cyan-700",
      bgColor: "bg-teal-50",
      stats: "10,000+ hoạt động",
      features: [
        "Vé skip-the-line",
        "Hướng dẫn chuyên nghiệp",
        "Đảm bảo hoàn tiền",
      ],
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ];

  const quickServices = [
    { name: "Visa du lịch", icon: Shield, count: "150+ quốc gia", link: "/visa" },
    { name: "Bảo hiểm du lịch", icon: Heart, count: "Bảo vệ toàn diện", link: "/insurance" },
    { name: "Đổi tiền", icon: Globe, count: "Tỉ giá tốt nhất", link: "/currency" },
    { name: "Wifi du lịch", icon: Zap, count: "Kết nối toàn cầu", link: "/wifi" },
  ];

  const handleServiceClick = (service: any) => {
    router.push(service.link);
  };

  const handleQuickServiceClick = (service: any) => {
    router.push(service.link);
  };

  const handlePlanTripClick = () => {
    router.push('/packages');
  };

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Dịch vụ du lịch toàn diện
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Mọi thứ bạn cần cho
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              chuyến đi hoàn hảo
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Từ đặt phòng khách sạn đến trải nghiệm địa phương, chúng tôi cung
            cấp giải pháp du lịch một cửa với công nghệ tiên tiến và dịch vụ
            khách hàng xuất sắc.
          </p>
        </div>

        {/* Quick Services Bar */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {quickServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors cursor-pointer group"
                    onClick={() => handleQuickServiceClick(service)}
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {service.name}
                      </h4>
                      <p className="text-sm text-gray-500">{service.count}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mainServices.map((service: any) => {
            const Icon = service.icon;
            const isHovered = hoveredCard === service.id;

            return (
              <div
                key={service.id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleServiceClick(service)}
              >
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-80`}
                  ></div>

                  {/* Icon overlay */}
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Stats badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white text-sm font-medium">
                        {service.stats}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature: any, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action button */}
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group">
                    <span>Khám phá ngay</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Hover effect gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">1M+</div>
              <div className="text-blue-100">Khách hàng hài lòng</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Đối tác toàn cầu</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Hỗ trợ khách hàng</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100+</div>
              <div className="text-blue-100">Quốc gia & vùng lãnh thổ</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            onClick={handlePlanTripClick}
          >
            <Calendar className="w-5 h-5" />
            Bắt đầu lên kế hoạch ngay
          </button>
          <p className="text-gray-500 mt-4">
            Miễn phí tư vấn và lập kế hoạch chi tiết
          </p>
        </div>
      </div>
    </div>
  );
}
