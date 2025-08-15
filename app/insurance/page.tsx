"use client"
import { useState } from 'react';
import { MotionDiv, MotionH2, MotionP, MotionButton } from '../components/common/MotionWrapper';

// Mock insurance data
const mockInsurance = [
  {
    id: 1,
    title: "Bảo hiểm du lịch cơ bản",
    subtitle: "Bảo vệ toàn diện cho chuyến du lịch của bạn",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=600&fit=crop",
    type: "Cơ bản",
    price: 150000,
    duration: "1-30 ngày",
    coverage: "50 triệu VND",
    rating: 4.5,
    reviewCount: 892,
    features: [
      "Bảo hiểm y tế khẩn cấp",
      "Bảo hiểm tai nạn",
      "Bảo hiểm hành lý",
      "Hỗ trợ khẩn cấp 24/7",
      "Bồi thường chuyến bay bị hủy",
      "Bảo hiểm trách nhiệm dân sự"
    ],
    exclusions: [
      "Thể thao mạo hiểm",
      "Bệnh có sẵn",
      "Chiến tranh, bạo động"
    ],
    claimProcess: "Đơn giản, nhanh chóng trong 7-14 ngày"
  },
  {
    id: 2,
    title: "Bảo hiểm du lịch cao cấp",
    subtitle: "Bảo vệ toàn diện với mức bồi thường cao",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop",
    type: "Cao cấp",
    price: 350000,
    duration: "1-90 ngày",
    coverage: "100 triệu VND",
    rating: 4.8,
    reviewCount: 567,
    features: [
      "Tất cả quyền lợi cơ bản",
      "Bảo hiểm thể thao mạo hiểm",
      "Bảo hiểm xe thuê",
      "Bảo hiểm thiết bị điện tử",
      "Bảo hiểm bệnh có sẵn",
      "Dịch vụ VIP 24/7"
    ],
    exclusions: [
      "Chiến tranh, bạo động",
      "Hành vi vi phạm pháp luật"
    ],
    claimProcess: "Ưu tiên xử lý trong 3-7 ngày"
  },
  {
    id: 3,
    title: "Bảo hiểm du lịch gia đình",
    subtitle: "Bảo vệ cả gia đình với giá ưu đãi",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=600&fit=crop",
    type: "Gia đình",
    price: 500000,
    duration: "1-30 ngày",
    coverage: "200 triệu VND",
    rating: 4.7,
    reviewCount: 423,
    features: [
      "Bảo hiểm cho tối đa 6 thành viên",
      "Bảo hiểm y tế toàn diện",
      "Bảo hiểm tai nạn",
      "Bảo hiểm hành lý",
      "Hỗ trợ khẩn cấp 24/7",
      "Bảo hiểm trách nhiệm dân sự"
    ],
    exclusions: [
      "Thể thao mạo hiểm",
      "Bệnh có sẵn",
      "Chiến tranh, bạo động"
    ],
    claimProcess: "Xử lý nhanh chóng trong 5-10 ngày"
  }
];

export default function InsurancePage() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const types = ['all', 'Cơ bản', 'Cao cấp', 'Gia đình', 'Doanh nghiệp'];
  const durations = ['all', '1-7 ngày', '8-15 ngày', '16-30 ngày', '31-90 ngày', '90+ ngày'];
  const priceRanges = [
    { value: 'all', label: 'Tất cả giá' },
    { value: 'budget', label: 'Dưới 200k' },
    { value: 'mid', label: '200k - 500k' },
    { value: 'high', label: '500k - 1M' },
    { value: 'luxury', label: 'Trên 1M' }
  ];

  const filteredInsurance = mockInsurance.filter(insurance => {
    if (selectedType !== 'all' && insurance.type !== selectedType) return false;
    if (priceRange !== 'all') {
      const price = insurance.price;
      switch (priceRange) {
        case 'budget': return price < 200000;
        case 'mid': return price >= 200000 && price <= 500000;
        case 'high': return price > 500000 && price <= 1000000;
        case 'luxury': return price > 1000000;
        default: return true;
      }
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Bảo hiểm du lịch
          </h1>
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl lg:text-2xl text-purple-100 max-w-3xl mx-auto"
          >
            Bảo vệ chuyến du lịch của bạn với các gói bảo hiểm toàn diện, an tâm khám phá thế giới
          </MotionP>
        </div>
      </section>

      {/* Why Insurance Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <MotionH2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-900 mb-12 text-center"
          >
            Tại sao cần bảo hiểm du lịch?
          </MotionH2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🛡️",
                title: "Bảo vệ tài chính",
                description: "Bồi thường chi phí y tế, tai nạn và các rủi ro không mong muốn"
              },
              {
                icon: "🚨",
                title: "Hỗ trợ khẩn cấp 24/7",
                description: "Đội ngũ hỗ trợ chuyên nghiệp sẵn sàng giúp đỡ mọi lúc"
              },
              {
                icon: "✈️",
                title: "Bảo hiểm chuyến bay",
                description: "Bồi thường khi chuyến bay bị hủy, trễ hoặc mất hành lý"
              }
            ].map((item, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loại bảo hiểm</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {types.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'Tất cả loại' : type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Thời hạn</label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {durations.map(duration => (
                    <option key={duration} value={duration}>
                      {duration === 'all' ? 'Tất cả thời hạn' : duration}
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
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
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

      {/* Insurance Plans Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <MotionH2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-900 mb-12 text-center"
          >
            {filteredInsurance.length} gói bảo hiểm được tìm thấy
          </MotionH2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredInsurance.map((plan, index) => (
              <MotionDiv
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-purple-200 transform hover:-translate-y-2"
              >
                {/* Plan Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={plan.image} 
                    alt={plan.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {plan.type}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="font-bold text-gray-900">{plan.rating}</span>
                      <span className="text-gray-600 text-sm">({plan.reviewCount.toLocaleString()})</span>
                    </div>
                  </div>
                </div>

                {/* Plan Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {plan.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {plan.subtitle}
                  </p>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-purple-50 p-3 rounded-xl">
                      <div className="text-purple-600 text-sm font-medium mb-1">Thời hạn</div>
                      <div className="text-gray-800 font-semibold">{plan.duration}</div>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-xl">
                      <div className="text-indigo-600 text-sm font-medium mb-1">Mức bồi thường</div>
                      <div className="text-gray-800 font-semibold">{plan.coverage}</div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {plan.price.toLocaleString()}đ
                    </div>
                    <span className="text-sm text-gray-600">/người</span>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Quyền lợi bao gồm</h4>
                    <div className="space-y-2">
                      {plan.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                          <span className="text-green-500">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Claim Process */}
                  <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                    <div className="text-blue-600 text-sm font-medium mb-1">Quy trình bồi thường</div>
                    <div className="text-gray-800 text-sm">{plan.claimProcess}</div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <MotionButton
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Mua bảo hiểm
                    </MotionButton>
                    <MotionButton
                      className="w-full px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Xem chi tiết
                    </MotionButton>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>

          {/* No Results */}
          {filteredInsurance.length === 0 && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy gói bảo hiểm</h3>
              <p className="text-gray-600 mb-6">Hãy thử thay đổi bộ lọc để tìm kiếm gói bảo hiểm phù hợp</p>
              <MotionButton
                onClick={() => {
                  setSelectedType('all');
                  setSelectedDuration('all');
                  setPriceRange('all');
                }}
                className="bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Xóa bộ lọc
              </MotionButton>
            </MotionDiv>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <MotionH2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-900 mb-12 text-center"
          >
            Câu hỏi thường gặp
          </MotionH2>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "Bảo hiểm du lịch có bắt buộc không?",
                answer: "Bảo hiểm du lịch không bắt buộc nhưng rất cần thiết để bảo vệ bạn khỏi các rủi ro không mong muốn."
              },
              {
                question: "Tôi có thể mua bảo hiểm khi đã ở nước ngoài không?",
                answer: "Không, bạn cần mua bảo hiểm trước khi khởi hành để được bảo vệ toàn diện."
              },
              {
                question: "Quy trình bồi thường có phức tạp không?",
                answer: "Không, quy trình rất đơn giản. Chỉ cần gọi hotline và cung cấp giấy tờ cần thiết."
              }
            ].map((faq, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 