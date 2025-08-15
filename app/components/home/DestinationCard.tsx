"use client"
import { motion } from "framer-motion";
import Link from "next/link";
import { FiStar, FiMapPin } from "react-icons/fi";

interface DestinationCardProps {
  destination: {
    id: number;
    city: string;
    country: string;
    image: string;
    rating: number;
    reviewCount: number;
    hotels: number;
    fromPrice: number;
    toPrice: number;
    slug: string;
    highlights: Array<{
      name: string;
      image: string;
    }>;
    activities: Array<{
      name: string;
      icon: string;
    }>;
  };
  index: number;
}

export default function DestinationCard({ destination, index }: DestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <Link href={`/destinations/${destination.slug}`}>
        <div className="relative h-80 overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-500">
          <img
            src={destination.image}
            alt={destination.city}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                  {destination.city}
                </h3>
                <div className="flex items-center text-white/90">
                  <FiMapPin className="mr-1" />
                  <span>{destination.country}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <FiStar className="text-yellow-400" />
                <span className="text-white font-semibold">{destination.rating}</span>
                <span className="text-white/80 text-xs">({destination.reviewCount.toLocaleString()})</span>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="text-white/80 text-sm">
                {destination.hotels > 0 ? (
                  <span>{destination.hotels} khách sạn</span>
                ) : (
                  <span>Khám phá ngay</span>
                )}
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-white">
                  {destination.fromPrice.toLocaleString()}đ - {destination.toPrice.toLocaleString()}đ
                </span>
              </div>
            </div>
          </div>

          {/* Hiển thị highlights nếu có */}
          {destination.highlights.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {destination.highlights.slice(0, 2).map((highlight, idx) => (
                <span 
                  key={idx}
                  className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium"
                >
                  {highlight.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}