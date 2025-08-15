
"use client"
import { FiAirplay, FiCamera, FiCoffee, FiHome, FiMap, FiShoppingBag } from 'react-icons/fi';
import { MotionH2, MotionA } from '../common/MotionWrapper';
import Link from 'next/link';

export default function ServicesGrid() {
  const services = [
    {
      id: 1,
      name: "Khách sạn",
      icon: <FiHome size={24} />,
      link: "/hotels",
      color: "text-blue-600"
    },
    {
      id: 2,
      name: "Vé máy bay",
      icon: <FiAirplay size={24} />,
      link: "/flights",
      color: "text-green-600"
    },
    {
      id: 3,
      name: "Tour du lịch",
      icon: <FiMap size={24} />,
      link: "/tours",
      color: "text-purple-600"
    },
    {
      id: 4,
      name: "Mua sắm",
      icon: <FiShoppingBag size={24} />,
      link: "/shopping",
      color: "text-red-600"
    },
    {
      id: 5,
      name: "Ẩm thực",
      icon: <FiCoffee size={24} />,
      link: "/dining",
      color: "text-yellow-600"
    },
    {
      id: 6,
      name: "Giải trí",
      icon: <FiCamera size={24} />,
      link: "/entertainment",
      color: "text-pink-600"
    }
  ];
  return (
    <div className="container mx-auto px-4 py-12">
      <MotionH2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold mb-8 text-center"
      >
        Dịch vụ du lịch
      </MotionH2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {(services ?? []).map((service) => (
          <MotionA
            key={service.id}
            href={service.link}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 h-full">
              <span className="text-3xl mb-2">{service.icon}</span>
              <span className="text-center font-medium text-gray-800 hover:text-red-600 transition-colors">
                {service.name}
              </span>
            </div>
          </MotionA>
        ))}
      </div>
    </div>
  );
}