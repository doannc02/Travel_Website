"use client"
import { useState, useEffect } from 'react';
import { MotionDiv, MotionH2, MotionP, MotionButton } from '../components/common/MotionWrapper';
import Link from 'next/link';

interface Package {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
  discount: string;
  originalPrice: number;
  price: number;
  duration: string;
  groupSize: string;
  departure: string;
  rating: number;
  reviewCount: number;
  validUntil: string;
  highlights: string[];
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [duration, setDuration] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const destinations = ['all', 'Phú Quốc', 'Sapa', 'Đà Nẵng', 'Nha Trang', 'Hà Nội', 'TP.HCM'];
  const priceRanges = [
    { value: 'all', label: 'Tất cả giá' },
    { value: 'budget', label: 'Dưới 2 triệu' },
    { value: 'mid', label: '2-4 triệu' },
    { value: 'high', label: '4-6 triệu' },
    { value: 'luxury', label: 'Trên 6 triệu' }
  ];
  const durations = [
    { value: 'all', label: 'Tất cả thời gian' },
    { value: '1-2', label: '1-2 ngày' },
    { value: '3-4', label: '3-4 ngày' },
    { value: '5+', label: '5+ ngày' }
  ];

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedDestination !== 'all') params.append('destinationId', selectedDestination);
      if (priceRange !== 'all') params.append('priceRange', priceRange);
      if (duration !== 'all') params.append('duration', duration);
      params.append('page', page.toString());
      params.append('limit', '10');

      const res = await fetch(`/api/packages?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setPackages(data.data);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch packages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [selectedDestination, priceRange, duration, page]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Gói du lịch trọn gói
          </h1>
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl lg:text-2xl text-green-100 max-w-3xl mx-auto"
          >
            Khám phá những điểm đến tuyệt vời với gói du lịch trọn gói, tiết kiệm thời gian và chi phí
          </MotionP>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white shadow-lg -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Destination Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Điểm đến</label>
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {destinations.map(destination => (
                    <option key={destination} value={destination}>
                      {destination === 'all' ? 'Tất cả điểm đến' : destination}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Khoảng giá</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {durations.map(durationOption => (
                    <option key={durationOption.value} value={durationOption.value}>
                      {durationOption.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <MotionButton
                  onClick={() => setPage(1)}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  🔍 Tìm kiếm
                </MotionButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <MotionH2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-900 mb-12 text-center"
          >
            {loading ? 'Đang tải...' : `${packages.length} gói du lịch được tìm thấy`}
          </MotionH2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {packages.map((pkg, index) => (
              <MotionDiv
                key={pkg.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200 transform hover:-translate-y-2"
              >
                {/* Package Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {pkg.badge}
                  </div>
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {pkg.discount}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="font-bold text-gray-900">{pkg.rating}</span>
                      <span className="text-gray-600 text-sm">({pkg.reviewCount.toLocaleString()})</span>
                    </div>
                  </div>
                </div>

                {/* Package Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {pkg.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {pkg.subtitle}
                  </p>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 p-3 rounded-xl">
                      <div className="text-blue-600 text-sm font-medium mb-1">Thời gian</div>
                      <div className="text-gray-800 font-semibold">{pkg.duration}</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-xl">
                      <div className="text-green-600 text-sm font-medium mb-1">Nhóm</div>
                      <div className="text-gray-800 font-semibold">{pkg.groupSize}</div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-3xl font-bold text-red-600">
                        {pkg.price.toLocaleString()}đ
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        {pkg.originalPrice.toLocaleString()}đ
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">/người</span>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Điểm nổi bật</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {pkg.highlights.slice(0, 4).map((highlight, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                          <span className="text-green-500">✓</span>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex space-x-3">
                    <Link className="flex-1" href={`/tour/${pkg.id}`}>
                      <MotionButton
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Đặt ngay
                      </MotionButton>
                    </Link>
                    <Link href={`/tour/${pkg.id}`}>
                      <MotionButton
                        className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition-all duration-300"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Chi tiết
                      </MotionButton>
                    </Link>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>

          {/* No Results */}
          {!loading && packages.length === 0 && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🎒</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy gói du lịch</h3>
              <p className="text-gray-600 mb-6">Hãy thử thay đổi bộ lọc để tìm kiếm gói du lịch phù hợp</p>
              <MotionButton
                onClick={() => {
                  setSelectedDestination('all');
                  setPriceRange('all');
                  setDuration('all');
                  setPage(1);
                }}
                className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Xóa bộ lọc
              </MotionButton>
            </MotionDiv>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center mt-12 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <MotionButton
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 rounded-lg font-semibold ${page === i + 1 ? 'bg-green-600 text-white' : 'bg-white border border-gray-300'}`}
                >
                  {i + 1}
                </MotionButton>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
