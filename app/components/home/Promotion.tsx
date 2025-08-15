"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useApi } from "@/app/hooks/useApi";

interface TourPackage {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  badge?: string;
  discount: string;
  originalPrice: number;
  price: number;
  duration: string;
  groupSize: string;
  departure: string;
  destination: {
    city: string;
    country: string;
    image: string;
  };
  rating: number;
  reviewCount: number;
  validUntil: string;
  category: string;
  highlights: string[];
  features: string[];
}

export default function Promotions() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const [activeTab, setActiveTab] = useState("all");
  const [packages, setHotels] = useState<any>([]);
  async function fetchFeaturedHotels() {
    try {
      const res = await fetch("/api/packages");
      const data = await res.json();
      if (data.success) {
        setHotels(data);
        console.log(data, "datadđ");
      }
    } catch (error) {
      console.error("Fetch packages error:", error);
    }
  }

  useEffect(() => {
    fetchFeaturedHotels();
  }, []);

  const promotions = packages?.data ?? [];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            Ưu đãi đặc biệt
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Khám phá các chương trình khuyến mãi hấp dẫn dành riêng cho bạn
          </motion.p>
        </div>

        {/* Promotion Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg bg-gray-100 p-1">
            {["Tất cả", "Combo", "Khách sạn", "Vé máy bay"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.toLowerCase()
                    ? "bg-white shadow text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promotions.map((promo: any, index: any) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={promo.image || promo.destination.image}
                  alt={promo.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/images/default-promo.jpg";
                  }}
                />
                {promo.badge && (
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {promo.badge}
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {promo.discount}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {promo.title}
                </h3>
                <p className="text-gray-600 mb-4">{promo.subtitle}</p>

                <div className="flex items-baseline space-x-2 mb-4">
                  <span className="text-2xl font-bold text-red-600">
                    {formatCurrency(promo.price)}
                  </span>
                  <span className="text-gray-400 line-through">
                    {formatCurrency(promo.originalPrice)}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {promo.highlights.slice(0, 3).map((feature : any, idx: number) => (
                    <span
                      key={idx}
                      className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>
                    Áp dụng đến:{" "}
                    {new Date(promo.validUntil).toLocaleDateString("vi-VN")}
                  </span>
                  <span className="flex items-center">
                    ★ {promo.rating} ({promo.reviewCount})
                  </span>
                </div>

                <Link href={`/packages/${promo.id}`}>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                    Xem chi tiết
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/packages">
            <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors">
              Xem tất cả gói du lịch ({packages.total})
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
