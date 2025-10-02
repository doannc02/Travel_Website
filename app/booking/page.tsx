"use client";
import { useState, useEffect } from "react";
import {
  MotionDiv,
  MotionH2,
  MotionH3,
  MotionP,
  MotionButton,
} from "../components/common/MotionWrapper";
import { useApi } from "../hooks/useApi";

interface TourPackage {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  price: number;
  discount: string;
  duration: string;
  destination: {
    city: string;
    country: string;
  };
}

interface BookingData {
  departureDate: string;
  returnDate: string;
  adults: number;
  children: number;
  infants: number;
  roomType: string;
  specialRequests: string;
  contactInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
}

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);
  const [bookingData, setBookingData] = useState<BookingData>({
    departureDate: "",
    returnDate: "",
    adults: 2,
    children: 0,
    infants: 0,
    roomType: "double",
    specialRequests: "",
    contactInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  // Fetch tour packages from API
  const {
    data: toursData,
    loading: toursLoading,
    error: toursError,
  } = useApi<{
    success: boolean;
    data: TourPackage[];
  }>("/api/tour-packages", { immediate: true });

  const steps = [
    { id: 1, title: "Chọn tour", icon: "🎯" },
    { id: 2, title: "Thông tin đặt", icon: "📝" },
    { id: 3, title: "Thanh toán", icon: "💳" },
    { id: 4, title: "Xác nhận", icon: "✅" },
  ];

  // Set first tour as default when data loads
  useEffect(() => {
    if (toursData?.success && toursData.data.length > 0 && !selectedTour) {
      setSelectedTour(toursData.data[0]);
    }
  }, [toursData, selectedTour]);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateTotal = () => {
    if (!selectedTour) return 0;
    const basePrice = selectedTour.price || 0;
    const totalPeople = bookingData.adults + bookingData.children;
    return basePrice * totalPeople;
  };

  const handleSubmitBooking = async () => {
    if (!selectedTour) return;

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tourId: selectedTour.id,
          ...bookingData,
          totalPrice: calculateTotal(),
          status: "pending",
        }),
      });

      const result = await response.json();

      if (result.success) {
        handleNext(); // Move to confirmation step
      } else {
        console.error("Booking failed:", result.error);
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  if (toursLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (toursError || !toursData?.success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Đã xảy ra lỗi khi tải dữ liệu tour</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-gray-900 rounded"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!selectedTour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Không có tour nào khả dụng</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <MotionH2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Đặt lịch tour
          </MotionH2>
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Hoàn tất thông tin để đặt tour du lịch mơ ước của bạn
          </MotionP>
        </div>

        {/* Progress Steps */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    currentStep >= step.id
                      ? "bg-red-600 border-red-600 text-gray-900"
                      : "bg-gray-100 border-gray-300 text-gray-500"
                  }`}
                >
                  <span className="text-lg">{step.icon}</span>
                </div>
                <div className="ml-3">
                  <div
                    className={`text-sm font-medium ${
                      currentStep >= step.id ? "text-red-600" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                      currentStep > step.id ? "bg-red-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </MotionDiv>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Tour Selection */}
            {currentStep === 1 && (
              <MotionDiv
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <MotionH3 className="text-2xl font-bold text-gray-900 mb-6">
                  Chọn tour du lịch
                </MotionH3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {toursData.data.map((tour, index) => (
                    <MotionDiv
                      key={tour.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedTour(tour)}
                      className={`cursor-pointer rounded-xl border-2 transition-all duration-300 ${
                        selectedTour.id === tour.id
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-red-300"
                      }`}
                    >
                      <div className="p-4">
                        <img
                          src={tour.image}
                          alt={tour.title}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <MotionH3 className="font-bold text-gray-900 mb-2">
                          {tour.title}
                        </MotionH3>
                        <MotionP className="text-gray-600 text-sm mb-3">
                          {tour.subtitle}
                        </MotionP>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-red-600">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(tour.price)}
                          </span>
                          <span className="text-sm text-gray-500">
                            {tour.duration}
                          </span>
                        </div>
                      </div>
                    </MotionDiv>
                  ))}
                </div>
              </MotionDiv>
            )}

            {/* Step 2: Booking Details */}
            {currentStep === 2 && (
              <MotionDiv
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <MotionH3 className="text-2xl font-bold text-gray-900 mb-6">
                  Thông tin đặt tour
                </MotionH3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Travel Dates */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Ngày khởi hành
                    </label>
                    <input
                      type="date"
                      value={bookingData.departureDate}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          departureDate: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Ngày về
                    </label>
                    <input
                      type="date"
                      value={bookingData.returnDate}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          returnDate: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  {/* Number of People */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Người lớn
                    </label>
                    <select
                      value={bookingData.adults}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          adults: parseInt(e.target.value),
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} người
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Trẻ em
                    </label>
                    <select
                      value={bookingData.children}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          children: parseInt(e.target.value),
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      {[0, 1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {num} trẻ
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Room Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Loại phòng
                    </label>
                    <select
                      value={bookingData.roomType}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          roomType: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="single">Phòng đơn</option>
                      <option value="double">Phòng đôi</option>
                      <option value="triple">Phòng ba</option>
                      <option value="family">Phòng gia đình</option>
                    </select>
                  </div>

                  {/* Special Requests */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Yêu cầu đặc biệt
                    </label>
                    <textarea
                      value={bookingData.specialRequests}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          specialRequests: e.target.value,
                        })
                      }
                      rows={3}
                      placeholder="Nhập yêu cầu đặc biệt của bạn..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </MotionDiv>
            )}

            {/* Step 3: Contact Information */}
            {currentStep === 3 && (
              <MotionDiv
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <MotionH3 className="text-2xl font-bold text-gray-900 mb-6">
                  Thông tin liên hệ
                </MotionH3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      value={bookingData.contactInfo.fullName}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          contactInfo: {
                            ...bookingData.contactInfo,
                            fullName: e.target.value,
                          },
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Nhập họ và tên"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={bookingData.contactInfo.email}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          contactInfo: {
                            ...bookingData.contactInfo,
                            email: e.target.value,
                          },
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      value={bookingData.contactInfo.phone}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          contactInfo: {
                            ...bookingData.contactInfo,
                            phone: e.target.value,
                          },
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="0123456789"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Địa chỉ
                    </label>
                    <input
                      type="text"
                      value={bookingData.contactInfo.address}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          contactInfo: {
                            ...bookingData.contactInfo,
                            address: e.target.value,
                          },
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Nhập địa chỉ"
                    />
                  </div>
                </div>
              </MotionDiv>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <MotionDiv
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <MotionH3 className="text-2xl font-bold text-gray-900 mb-6">
                  Xác nhận đặt tour
                </MotionH3>

                <div className="space-y-6">
                  {/* Tour Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Thông tin tour
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Tour:</span>
                        <span className="ml-2 font-medium">
                          {selectedTour.title}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Ngày đi:</span>
                        <span className="ml-2 font-medium">
                          {bookingData.departureDate}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Ngày về:</span>
                        <span className="ml-2 font-medium">
                          {bookingData.returnDate}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Số người:</span>
                        <span className="ml-2 font-medium">
                          {bookingData.adults + bookingData.children}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Thông tin liên hệ
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Họ tên:</span>
                        <span className="ml-2 font-medium">
                          {bookingData.contactInfo.fullName}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Email:</span>
                        <span className="ml-2 font-medium">
                          {bookingData.contactInfo.email}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Điện thoại:</span>
                        <span className="ml-2 font-medium">
                          {bookingData.contactInfo.phone}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Địa chỉ:</span>
                        <span className="ml-2 font-medium">
                          {bookingData.contactInfo.address}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1" />
                    <p className="text-sm text-gray-600">
                      Tôi đồng ý với{" "}
                      <span className="text-red-600 cursor-pointer">
                        điều khoản sử dụng
                      </span>{" "}
                      và{" "}
                      <span className="text-red-600 cursor-pointer">
                        chính sách bảo mật
                      </span>{" "}
                      của Traveloka
                    </p>
                  </div>
                </div>
              </MotionDiv>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <MotionButton
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentStep === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-600 text-gray-900 hover:bg-gray-700"
                }`}
                whileHover={currentStep !== 1 ? { scale: 1.05 } : {}}
                whileTap={currentStep !== 1 ? { scale: 0.95 } : {}}
              >
                Quay lại
              </MotionButton>

              {currentStep < steps.length - 1 ? (
                <MotionButton
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-gray-900 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Tiếp tục
                </MotionButton>
              ) : currentStep === steps.length - 1 ? (
                <MotionButton
                  onClick={handleSubmitBooking}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-gray-900 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Xác nhận đặt tour
                </MotionButton>
              ) : (
                <MotionButton
                  onClick={() => (window.location.href = "/my-bookings")}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-gray-900 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Xem đơn đặt tour
                </MotionButton>
              )}
            </div>
          </div>

          {/* Right Sidebar - Summary */}
          <div className="lg:col-span-1">
            <MotionDiv
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-6"
            >
              <MotionH3 className="text-xl font-bold text-gray-900 mb-4">
                Tóm tắt đặt tour
              </MotionH3>

              {/* Selected Tour */}
              <div className="mb-6">
                <img
                  src={selectedTour.image}
                  alt={selectedTour.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-semibold text-gray-900 mb-2">
                  {selectedTour.title}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {selectedTour.subtitle}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-red-600">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(selectedTour.price)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {selectedTour.duration}
                  </span>
                </div>
              </div>

              {/* Booking Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Ngày đi:</span>
                  <span className="font-medium">
                    {bookingData.departureDate || "Chưa chọn"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Ngày về:</span>
                  <span className="font-medium">
                    {bookingData.returnDate || "Chưa chọn"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Số người:</span>
                  <span className="font-medium">
                    {bookingData.adults + bookingData.children}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Loại phòng:</span>
                  <span className="font-medium capitalize">
                    {bookingData.roomType}
                  </span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Giá tour:</span>
                  <span>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(selectedTour.price)}
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Phí dịch vụ:</span>
                  <span>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(150000)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-red-600">
                  <span>Tổng cộng:</span>
                  <span>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(calculateTotal())}
                  </span>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">
                  Bước {currentStep} / {steps.length}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / steps.length) * 100}%` }}
                  />
                </div>
              </div>
            </MotionDiv>
          </div>
        </div>
      </div>
    </div>
  );
}
