"use client"
import { useState } from 'react';
import { MotionDiv, MotionH2, MotionP, MotionButton } from '../components/common/MotionWrapper';

// Mock activities data
const mockActivities = [
  {
    id: 1,
    title: "Lặn ngắm san hô Phú Quốc",
    subtitle: "Khám phá thế giới dưới đáy biển với hướng dẫn viên chuyên nghiệp",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=600&fit=crop",
    category: "Thể thao biển",
    location: "Phú Quốc, Kiên Giang",
    duration: "3-4 giờ",
    groupSize: "2-8 người",
    price: 850000,
    originalPrice: 1200000,
    discount: "29%",
    rating: 4.8,
    reviewCount: 567,
    difficulty: "Trung bình",
    ageRequirement: "12+",
    included: ["Thiết bị lặn", "Hướng dẫn viên", "Bảo hiểm", "Ảnh dưới nước"],
    highlights: [
      "Lặn tại 3 điểm san hô đẹp nhất",
      "Hướng dẫn viên PADI certified",
      "Thiết bị chất lượng cao",
      "Ảnh kỷ niệm miễn phí"
    ],
    schedule: "08:00 - 12:00 hàng ngày",
    bestTime: "Tháng 11 - Tháng 4"
  },
  {
    id: 2,
    title: "Leo núi Fansipan - Nóc nhà Đông Dương",
    subtitle: "Chinh phục đỉnh núi cao nhất Việt Nam với view tuyệt đẹp",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=600&fit=crop",
    category: "Leo núi",
    location: "Sapa, Lào Cai",
    duration: "2 ngày 1 đêm",
    groupSize: "4-12 người",
    price: 1800000,
    originalPrice: 2500000,
    discount: "28%",
    rating: 4.9,
    reviewCount: 892,
    difficulty: "Khó",
    ageRequirement: "16+",
    included: ["Hướng dẫn viên", "Thiết bị leo núi", "Ăn uống", "Homestay", "Bảo hiểm"],
    highlights: [
      "Leo núi Fansipan 3.143m",
      "Ngắm bình minh trên đỉnh núi",
      "Khám phá văn hóa dân tộc",
      "View ruộng bậc thang tuyệt đẹp"
    ],
    schedule: "Thứ 7 - Chủ nhật hàng tuần",
    bestTime: "Tháng 9 - Tháng 11"
  },
  {
    id: 3,
    title: "Khám phá phố cổ Hội An về đêm",
    subtitle: "Trải nghiệm văn hóa truyền thống với đèn lồng và ẩm thực địa phương",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop",
    category: "Văn hóa",
    location: "Hội An, Quảng Nam",
    duration: "4-5 giờ",
    groupSize: "2-15 người",
    price: 450000,
    originalPrice: 650000,
    discount: "31%",
    rating: 4.7,
    reviewCount: 1234,
    difficulty: "Dễ",
    ageRequirement: "Mọi lứa tuổi",
    included: ["Hướng dẫn viên", "Vé tham quan", "Thả đèn hoa đăng", "Ăn tối địa phương"],
    highlights: [
      "Tham quan phố cổ về đêm",
      "Thả đèn hoa đăng sông Hoài",
      "Thưởng thức ẩm thực địa phương",
      "Chụp ảnh với trang phục truyền thống"
    ],
    schedule: "18:00 - 22:00 hàng ngày",
    bestTime: "Tháng 2 - Tháng 8"
  },
  {
    id: 4,
    title: "Chèo thuyền kayak vịnh Hạ Long",
    subtitle: "Khám phá vịnh Hạ Long từ góc nhìn mới với thuyền kayak",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=600&fit=crop",
    category: "Thể thao biển",
    location: "Vịnh Hạ Long, Quảng Ninh",
    duration: "6-8 giờ",
    groupSize: "2-10 người",
    price: 1200000,
    originalPrice: 1800000,
    discount: "33%",
    rating: 4.6,
    reviewCount: 456,
    difficulty: "Trung bình",
    ageRequirement: "14+",
    included: ["Thuyền kayak", "Hướng dẫn viên", "Ăn trưa", "Bảo hiểm", "Vận chuyển"],
    highlights: [
      "Chèo thuyền qua hang động",
      "Khám phá vịnh trong làng",
      "Tắm biển tại bãi biển hoang sơ",
      "Ngắm hoàng hôn trên vịnh"
    ],
    schedule: "08:00 - 16:00 hàng ngày",
    bestTime: "Tháng 3 - Tháng 11"
  }
];

export default function ActivitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const categories = ['all', 'Thể thao biển', 'Leo núi', 'Văn hóa', 'Khám phá', 'Ẩm thực'];
  const locations = ['all', 'Phú Quốc', 'Sapa', 'Hội An', 'Vịnh Hạ Long', 'Nha Trang', 'Đà Nẵng'];
  const priceRanges = [
    { value: 'all', label: 'Tất cả giá' },
    { value: 'budget', label: 'Dưới 500k' },
    { value: 'mid', label: '500k - 1.5M' },
    { value: 'high', label: '1.5M - 3M' },
    { value: 'luxury', label: 'Trên 3M' }
  ];

  const filteredActivities = mockActivities.filter(activity => {
    if (selectedCategory !== 'all' && activity.category !== selectedCategory) return false;
    if (selectedLocation !== 'all' && !activity.location.includes(selectedLocation)) return false;
    if (priceRange !== 'all') {
      const price = activity.price;
      switch (priceRange) {
        case 'budget': return price < 500000;
        case 'mid': return price >= 500000 && price <= 1500000;
        case 'high': return price > 1500000 && price <= 3000000;
        case 'luxury': return price > 3000000;
        default: return true;
      }
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Hoạt động & Giải trí
          </h1>
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl lg:text-2xl text-orange-100 max-w-3xl mx-auto"
          >
            Khám phá những hoạt động thú vị và trải nghiệm độc đáo tại các điểm đến tuyệt vời
          </MotionP>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white shadow-lg -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'Tất cả danh mục' : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Địa điểm</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {locations.map(location => (
                    <option key={location} value={location}>
                      {location === 'all' ? 'Tất cả địa điểm' : location}
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
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <MotionButton
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300"
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

      {/* Activities Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <MotionH2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-900 mb-12 text-center"
          >
            {filteredActivities.length} hoạt động được tìm thấy
          </MotionH2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredActivities.map((activity, index) => (
              <MotionDiv
                key={activity.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-orange-200 transform hover:-translate-y-2"
              >
                {/* Activity Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={activity.image} 
                    alt={activity.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {activity.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {activity.discount}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="font-bold text-gray-900">{activity.rating}</span>
                      <span className="text-gray-600 text-sm">({activity.reviewCount.toLocaleString()})</span>
                    </div>
                  </div>
                </div>

                {/* Activity Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {activity.subtitle}
                  </p>

                  {/* Quick Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-orange-50 p-3 rounded-xl">
                      <div className="text-orange-600 text-sm font-medium mb-1">Thời gian</div>
                      <div className="text-gray-800 font-semibold">{activity.duration}</div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-xl">
                      <div className="text-red-600 text-sm font-medium mb-1">Nhóm</div>
                      <div className="text-gray-800 font-semibold">{activity.groupSize}</div>
                    </div>
                  </div>

                  {/* Location & Schedule */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <span className="text-orange-500 mr-2">📍</span>
                        {activity.location}
                      </span>
                      <span className="flex items-center">
                        <span className="text-red-500 mr-2">🕒</span>
                        {activity.schedule}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <span className="text-blue-500 mr-2">⚡</span>
                        Độ khó: {activity.difficulty}
                      </span>
                      <span className="flex items-center">
                        <span className="text-green-500 mr-2">👥</span>
                        {activity.ageRequirement}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-3xl font-bold text-red-600">
                        {activity.price.toLocaleString()}đ
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        {activity.originalPrice.toLocaleString()}đ
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">/người</span>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Điểm nổi bật</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {activity.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                          <span className="text-orange-500">✓</span>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex space-x-3">
                    <MotionButton
                      className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Đặt ngay
                    </MotionButton>
                    <MotionButton
                      className="px-6 py-3 border-2 border-orange-600 text-orange-600 rounded-xl font-semibold hover:bg-orange-600 hover:text-white transition-all duration-300"
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

          {/* No Results */}
          {filteredActivities.length === 0 && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy hoạt động</h3>
              <p className="text-gray-600 mb-6">Hãy thử thay đổi bộ lọc để tìm kiếm hoạt động phù hợp</p>
              <MotionButton
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedLocation('all');
                  setPriceRange('all');
                }}
                className="bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Xóa bộ lọc
              </MotionButton>
            </MotionDiv>
          )}
        </div>
      </section>
    </div>
  );
} 