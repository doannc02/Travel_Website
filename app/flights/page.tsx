"use client"
import { useState } from 'react';
import { MotionDiv, MotionH2, MotionP, MotionButton } from '../components/common/MotionWrapper';

// Mock flight data
const mockFlights = [
  {
    id: 1,
    airline: "Vietnam Airlines",
    flightNumber: "VN123",
    departure: "Hà Nội (HAN)",
    arrival: "TP.HCM (SGN)",
    departureTime: "08:00",
    arrivalTime: "10:15",
    duration: "2h 15m",
    price: 1200000,
    originalPrice: 1800000,
    discount: "33%",
    stops: "Bay thẳng",
    aircraft: "Airbus A350",
    class: "Economy",
    availableSeats: 45,
    features: ["Hành lý 7kg", "Đổi vé miễn phí", "Bữa ăn", "WiFi"]
  },
  {
    id: 2,
    airline: "VietJet Air",
    flightNumber: "VJ456",
    departure: "Hà Nội (HAN)",
    arrival: "Đà Nẵng (DAD)",
    departureTime: "14:30",
    arrivalTime: "15:45",
    duration: "1h 15m",
    price: 599000,
    originalPrice: 1200000,
    discount: "50%",
    stops: "Bay thẳng",
    aircraft: "Airbus A320",
    class: "Economy",
    availableSeats: 23,
    features: ["Hành lý 7kg", "Đổi vé", "Bữa ăn"]
  },
  {
    id: 3,
    airline: "Bamboo Airways",
    flightNumber: "QH789",
    departure: "TP.HCM (SGN)",
    arrival: "Phú Quốc (PQC)",
    departureTime: "16:00",
    arrivalTime: "17:00",
    duration: "1h 0m",
    price: 450000,
    originalPrice: 800000,
    discount: "44%",
    stops: "Bay thẳng",
    aircraft: "Airbus A320",
    class: "Economy",
    availableSeats: 67,
    features: ["Hành lý 7kg", "Đổi vé", "Bữa ăn"]
  }
];

export default function FlightsPage() {
  const [searchForm, setSearchForm] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy'
  });

  const [isRoundTrip, setIsRoundTrip] = useState(false);

  const cities = [
    'Hà Nội (HAN)', 'TP.HCM (SGN)', 'Đà Nẵng (DAD)', 'Phú Quốc (PQC)',
    'Nha Trang (CXR)', 'Huế (HUI)', 'Cần Thơ (VCA)', 'Đà Lạt (DLI)'
  ];

  const classes = [
    { value: 'economy', label: 'Economy', icon: '🛋️' },
    { value: 'premium', label: 'Premium Economy', icon: '🛋️' },
    { value: 'business', label: 'Business', icon: '💼' },
    { value: 'first', label: 'First Class', icon: '👑' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching flights:', searchForm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Vé máy bay giá rẻ
          </h1>
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto"
          >
            Tìm kiếm và đặt vé máy bay với giá tốt nhất, bay đến mọi nơi trên thế giới
          </MotionP>
        </div>
      </section>

      {/* Search Form */}
      <section className="py-8 bg-white shadow-lg -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
            {/* Trip Type */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setIsRoundTrip(false)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    !isRoundTrip 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  🛫 Một chiều
                </button>
                <button
                  type="button"
                  onClick={() => setIsRoundTrip(true)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    isRoundTrip 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  🔄 Khứ hồi
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* From */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Điểm đi</label>
                <select
                  value={searchForm.from}
                  onChange={(e) => setSearchForm({...searchForm, from: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Chọn điểm đi</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Điểm đến</label>
                <select
                  value={searchForm.to}
                  onChange={(e) => setSearchForm({...searchForm, to: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Chọn điểm đến</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Departure Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ngày đi</label>
                <input
                  type="date"
                  value={searchForm.departureDate}
                  onChange={(e) => setSearchForm({...searchForm, departureDate: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Return Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isRoundTrip ? 'Ngày về' : 'Hành khách'}
                </label>
                {isRoundTrip ? (
                  <input
                    type="date"
                    value={searchForm.returnDate}
                    onChange={(e) => setSearchForm({...searchForm, returnDate: e.target.value})}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                ) : (
                  <select
                    value={searchForm.passengers}
                    onChange={(e) => setSearchForm({...searchForm, passengers: parseInt(e.target.value)})}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1,2,3,4,5,6,7,8,9].map(num => (
                      <option key={num} value={num}>{num} hành khách</option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* Additional Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Passengers for round trip */}
              {isRoundTrip && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hành khách</label>
                  <select
                    value={searchForm.passengers}
                    onChange={(e) => setSearchForm({...searchForm, passengers: parseInt(e.target.value)})}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1,2,3,4,5,6,7,8,9].map(num => (
                      <option key={num} value={num}>{num} hành khách</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Class */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hạng vé</label>
                <select
                  value={searchForm.class}
                  onChange={(e) => setSearchForm({...searchForm, class: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {classes.map(cls => (
                    <option key={cls.value} value={cls.value}>
                      {cls.icon} {cls.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <MotionButton
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  🔍 Tìm chuyến bay
                </MotionButton>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Flights Results */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <MotionH2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-900 mb-12 text-center"
          >
            Chuyến bay khuyến mãi
          </MotionH2>

          <div className="space-y-4">
            {mockFlights.map((flight, index) => (
              <MotionDiv
                key={flight.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row items-center justify-between">
                    {/* Flight Info */}
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="text-2xl">{flight.airline === 'Vietnam Airlines' ? '🇻🇳' : flight.airline === 'VietJet Air' ? '🛩️' : '🎋'}</div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{flight.airline}</h3>
                          <p className="text-sm text-gray-600">{flight.flightNumber} • {flight.aircraft}</p>
                        </div>
                      </div>

                      {/* Route */}
                      <div className="flex items-center space-x-8">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{flight.departureTime}</div>
                          <div className="text-sm text-gray-600">{flight.departure}</div>
                        </div>
                        
                        <div className="flex-1 text-center">
                          <div className="text-sm text-gray-500 mb-1">{flight.duration}</div>
                          <div className="flex items-center justify-center">
                            <div className="w-16 h-px bg-gray-300 relative">
                              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full"></div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{flight.stops}</div>
                        </div>

                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{flight.arrivalTime}</div>
                          <div className="text-sm text-gray-600">{flight.arrival}</div>
                        </div>
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex flex-col items-center space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-red-600">
                          {flight.price.toLocaleString()}đ
                        </div>
                        <div className="text-sm text-gray-500 line-through">
                          {flight.originalPrice.toLocaleString()}đ
                        </div>
                        <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          {flight.discount}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Còn {flight.availableSeats} chỗ</div>
                        <div className="text-xs text-gray-500">{flight.class}</div>
                      </div>

                      <MotionButton
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Đặt vé
                      </MotionButton>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      {flight.features.map((feature, idx) => (
                        <span 
                          key={idx}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 