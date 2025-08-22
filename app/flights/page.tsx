"use client";
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function FlightsPage() {
  const searchParams = useSearchParams();
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: ''
  });

  useEffect(() => {
    const destination = searchParams.get('destination') || '';
    const checkIn = searchParams.get('checkIn') || '';
    const checkOut = searchParams.get('checkOut') || '';
    const guests = searchParams.get('guests') || '';

    setSearchData({ destination, checkIn, checkOut, guests });
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Tìm kiếm vé máy bay</h1>
          
          {searchData.destination && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Điểm đến</div>
                <div className="font-semibold">{searchData.destination}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Ngày đi</div>
                <div className="font-semibold">{searchData.checkIn}</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Ngày về</div>
                <div className="font-semibold">{searchData.checkOut}</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Hành khách</div>
                <div className="font-semibold">{searchData.guests}</div>
              </div>
            </div>
          )}

          <div className="text-center py-12">
            <div className="text-6xl mb-4">✈️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Trang tìm kiếm vé máy bay
            </h2>
            <p className="text-gray-600 mb-6">
              Tính năng tìm kiếm vé máy bay sẽ được phát triển trong tương lai.
            </p>
            <button 
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Quay lại trang chủ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 