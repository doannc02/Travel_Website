"use client"
import { useState } from 'react';
import { MotionDiv } from './MotionWrapper';

// Static JSON data for demonstration
const mockTabs = [
  {
    id: 'hotels',
    label: 'Khách sạn',
    icon: '🏨'
  },
  {
    id: 'flights',
    label: 'Vé máy bay',
    icon: '✈️'
  },
  {
    id: 'packages',
    label: 'Gói du lịch',
    icon: '🎒'
  }
];

const mockHotelData = {
  destinations: ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Nha Trang', 'Phú Quốc'],
  checkIn: '2024-01-15',
  checkOut: '2024-01-18',
  guests: '2 người lớn, 1 trẻ em'
};

const mockFlightData = {
  from: 'Hà Nội',
  to: 'TP. Hồ Chí Minh',
  departure: '2024-01-15',
  return: '2024-01-20',
  passengers: '1 người lớn'
};

const mockPackageData = {
  destination: 'Phú Quốc',
  duration: '3 ngày 2 đêm',
  travelers: '2 người lớn'
};

export default function SearchBar() {
  const [activeTab, setActiveTab] = useState('hotels');
  
  return (
    <MotionDiv 
      className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex border-b">
        {mockTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium relative flex items-center gap-2 ${
              activeTab === tab.id ? 'text-red-600' : 'text-gray-600'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
            {activeTab === tab.id && (
              <MotionDiv 
                className="absolute bottom-0 left-0 right-0 h-1 bg-red-600"
                layoutId="underline"
              />
            )}
          </button>
        ))}
      </div>
      
      <div className="p-6">
        {activeTab === 'hotels' && <HotelSearchForm />}
        {activeTab === 'flights' && <FlightSearchForm />}
        {activeTab === 'packages' && <PackageSearchForm />}
      </div>
    </MotionDiv>
  );
}

const HotelSearchForm = () => (
  <MotionDiv 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="grid grid-cols-1 md:grid-cols-4 gap-4"
  >
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Điểm đến</label>
      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
        <option>Chọn điểm đến</option>
        {mockHotelData.destinations.map((dest, index) => (
          <option key={index} value={dest}>{dest}</option>
        ))}
      </select>
    </div>
    
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Nhận phòng</label>
      <input 
        type="date" 
        defaultValue={mockHotelData.checkIn}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
      />
    </div>
    
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Trả phòng</label>
      <input 
        type="date" 
        defaultValue={mockHotelData.checkOut}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
      />
    </div>
    
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Khách</label>
      <input 
        type="text" 
        defaultValue={mockHotelData.guests}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
      />
    </div>
    
    <div className="md:col-span-4">
      <button className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors">
        Tìm kiếm khách sạn
      </button>
    </div>
  </MotionDiv>
);

const FlightSearchForm = () => (
  <MotionDiv 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="grid grid-cols-1 md:grid-cols-5 gap-4"
  >
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Đi từ</label>
      <input 
        type="text" 
        defaultValue={mockFlightData.from}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
      />
    </div>
    
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Đi đến</label>
      <input 
        type="text" 
        defaultValue={mockFlightData.to}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
      />
    </div>
    
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Ngày đi</label>
      <input 
        type="date" 
        defaultValue={mockFlightData.departure}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
      />
    </div>
    
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Ngày về</label>
      <input 
        type="date" 
        defaultValue={mockFlightData.return}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
      />
    </div>
    
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Hành khách</label>
      <input 
        type="text" 
        defaultValue={mockFlightData.passengers}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
      />
    </div>
    
    <div className="md:col-span-5">
      <button className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors">
        Tìm kiếm vé máy bay
      </button>
    </div>
  </MotionDiv>
);

const PackageSearchForm = () => (
  <MotionDiv 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="grid grid-cols-1 md:grid-cols-3 gap-4"
  >
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Điểm đến</label>
      <input 
        type="text" 
        defaultValue={mockPackageData.destination}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
      />
    </div>
    
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Thời gian</label>
      <input 
        type="text" 
        defaultValue={mockPackageData.duration}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
      />
    </div>
    
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Số khách</label>
      <input 
        type="text" 
        defaultValue={mockPackageData.travelers}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
      />
    </div>
    
    <div className="md:col-span-3">
      <button className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors">
        Tìm kiếm gói du lịch
      </button>
    </div>
  </MotionDiv>
);