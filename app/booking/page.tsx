"use client";
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface BookingFormData {
  packageId: string;
  participants: number;
  selectedDate: string;
  specialRequests: string;
  contactInfo: {
    fullName: string;
    email: string;
    phone: string;
    emergencyContact: string;
  };
}

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const packageId = searchParams.get('packageId');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tourPackage, setTourPackage] = useState<any>(null);
  const [availableSpots, setAvailableSpots] = useState<number>(0);

  const [formData, setFormData] = useState<BookingFormData>({
    packageId: packageId || '',
    participants: 2,
    selectedDate: '',
    specialRequests: '',
    contactInfo: {
      fullName: '',
      email: '',
      phone: '',
      emergencyContact: ''
    }
  });

  // Check authentication and fetch tour package
  useEffect(() => {
    if (!packageId) {
      setError('Không tìm thấy thông tin tour');
      return;
    }
    checkAuth();
    fetchTourPackage();
  }, [packageId]);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/login');
      const data = await res.json();
      setIsAuthenticated(data.isLoggedIn);
      
      if (!data.isLoggedIn) {
        router.push(`/auth/signin?callbackUrl=/booking?packageId=${packageId}`);
      } else if (data.user) {
        // Pre-fill user info
        setFormData(prev => ({
          ...prev,
          contactInfo: {
            ...prev.contactInfo,
            fullName: data.user.name || '',
            email: data.user.email || '',
            phone: data.user.phone || ''
          }
        }));
      }
    } catch (err) {
      console.error('Auth check error:', err);
      setIsAuthenticated(false);
    }
  };

  const fetchTourPackage = async () => {
    try {
      const res = await fetch(`/api/packages/${packageId}?rich=1`);
      if (!res.ok) throw new Error('Failed to fetch tour package');
      const data = await res.json();
      setTourPackage(data.data);
      
      // Set default date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      setFormData(prev => ({
        ...prev,
        selectedDate: tomorrowStr
      }));

      // Check availability
      checkAvailability(tomorrowStr);
    } catch (err) {
      setError('Không thể tải thông tin tour');
    }
  };

  const checkAvailability = async (date: string) => {
    try {
      const res = await fetch(`/api/packages/${packageId}/availability?date=${date}`);
      if (res.ok) {
        const data = await res.json();
        setAvailableSpots(data.availableSpots);
        
        // Adjust participants if exceeds available spots
        if (formData.participants > data.availableSpots) {
          setFormData(prev => ({
            ...prev,
            participants: Math.max(1, data.availableSpots)
          }));
        }
      }
    } catch (err) {
      console.error('Error checking availability:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('contactInfo.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'participants' ? parseInt(value) : value
      }));
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setFormData(prev => ({ ...prev, selectedDate: date }));
    checkAvailability(date);
  };

  const validateForm = (): boolean => {
    if (!formData.selectedDate) {
      setError('Vui lòng chọn ngày khởi hành');
      return false;
    }

    if (formData.participants < 1) {
      setError('Số người tham gia phải lớn hơn 0');
      return false;
    }

    if (formData.participants > availableSpots) {
      setError(`Chỉ còn ${availableSpots} chỗ trống cho ngày này`);
      return false;
    }

    if (!formData.contactInfo.fullName.trim()) {
      setError('Vui lòng nhập họ tên');
      return false;
    }

    if (!formData.contactInfo.email.trim()) {
      setError('Vui lòng nhập email');
      return false;
    }

    if (!formData.contactInfo.phone.trim()) {
      setError('Vui lòng nhập số điện thoại');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Booking failed');
      }

      // Redirect to confirmation page
      router.push(`/booking/confirmation?bookingCode=${data.booking.bookingCode}`);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Đang kiểm tra đăng nhập...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Đang chuyển hướng đến trang đăng nhập...</div>
      </div>
    );
  }

  if (!tourPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Không tìm thấy thông tin tour</div>
      </div>
    );
  }

  const totalPrice = tourPackage.price * formData.participants;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <h1 className="text-2xl font-bold">Đặt Tour</h1>
            <p className="opacity-90">{tourPackage.title}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Tour Summary */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-lg mb-2">Thông tin Tour</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Điểm đến:</strong> {tourPackage.destination?.city}</p>
                  <p><strong>Thời lượng:</strong> {tourPackage.duration}</p>
                  <p><strong>Khởi hành:</strong> {tourPackage.departure}</p>
                </div>
                <div>
                  <p><strong>Nhóm:</strong> {tourPackage.groupSize} người</p>
                  <p><strong>Đánh giá:</strong> ⭐ {tourPackage.rating} ({tourPackage.reviewCount})</p>
                  <p><strong>Giá/người:</strong> {new Intl.NumberFormat('vi-VN').format(tourPackage.price)}đ</p>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Thông tin đặt tour</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ngày khởi hành *
                  </label>
                  <input
                    type="date"
                    name="selectedDate"
                    value={formData.selectedDate}
                    onChange={handleDateChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Số người tham gia *
                  </label>
                  <select
                    name="participants"
                    value={formData.participants}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {[...Array(Math.min(availableSpots, 20))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} người
                      </option>
                    ))}
                  </select>
                  {availableSpots > 0 ? (
                    <p className="text-sm text-green-600 mt-1">
                      Còn {availableSpots} chỗ trống
                    </p>
                  ) : (
                    <p className="text-sm text-red-600 mt-1">
                      Đã hết chỗ cho ngày này
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Thông tin liên hệ</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Họ tên *
                  </label>
                  <input
                    type="text"
                    name="contactInfo.fullName"
                    value={formData.contactInfo.fullName}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="contactInfo.email"
                    value={formData.contactInfo.email}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    name="contactInfo.phone"
                    value={formData.contactInfo.phone}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Liên hệ khẩn cấp
                  </label>
                  <input
                    type="text"
                    name="contactInfo.emergencyContact"
                    value={formData.contactInfo.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Số điện thoại người liên hệ khẩn cấp"
                  />
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Yêu cầu đặc biệt
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows={3}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Chế độ ăn uống, yêu cầu đặc biệt, dị ứng..."
              />
            </div>

            {/* Price Summary */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span>Giá tour/người:</span>
                <span>{new Intl.NumberFormat('vi-VN').format(tourPackage.price)}đ</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Số người:</span>
                <span>{formData.participants}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                <span>Tổng cộng:</span>
                <span className="text-red-600">
                  {new Intl.NumberFormat('vi-VN').format(totalPrice)}đ
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Quay lại
              </button>
              <button
                type="submit"
                disabled={loading || availableSpots === 0}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Đang xử lý...' : 'Xác nhận đặt tour'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}