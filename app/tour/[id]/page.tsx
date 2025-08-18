"use client"
import { useEffect, useMemo, useState } from 'react';
import { MotionDiv, MotionH2, MotionH3, MotionP, MotionButton } from '../../components/common/MotionWrapper';
import { useParams } from 'next/navigation';
import Link from 'next/link';

type ItineraryItem = { day: string; content: string };
type Review = { id: number; name: string; rating: number; comment: string; photos: string[]; createdAt: string };

export default function TourDetailPage() {
  const params = useParams();
  const tourId = params.id as string;
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'included' | 'reviews'>('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tourData, setTourData] = useState<any | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const formatVnd = (n: number) => new Intl.NumberFormat('vi-VN').format(n) + 'đ';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/packages/${tourId}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        setTourData(json.data);
        setReviews(json.data.reviews ?? []);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    if (tourId) fetchData();
  }, [tourId]);

  const images: string[] = useMemo(() => {
    if (!tourData) return [];
    const extra = (tourData.images ?? []).map((i: any) => i.url);
    return [tourData.image, ...extra].filter(Boolean);
  }, [tourData]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;
  }
  if (error || !tourData) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">Không tải được tour.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image Gallery */}
      <section className="relative h-96 lg:h-[600px] overflow-hidden">
        {/* Main Image */}
        <img
          src={images[selectedImage]}
          alt={tourData.title}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Back Button */}
        <MotionButton
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ←
        </MotionButton>

        {/* Image Gallery Thumbnails */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <MotionButton
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index ? 'border-white' : 'border-white/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={image}
                  alt={`Tour image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </MotionButton>
            ))}
          </div>
        </div>

        {/* Tour Info Overlay */}
        <div className="absolute bottom-6 right-6 text-right text-white">
          <MotionH2 className="text-3xl lg:text-4xl font-bold mb-2">
            {tourData.title}
          </MotionH2>
          <MotionP className="text-lg opacity-90 mb-2">
            {tourData?.destination?.city}, {tourData?.destination?.country} • {tourData.duration}
          </MotionP>
          <div className="flex items-center justify-end space-x-2 mb-2">
            <span className="text-yellow-400">⭐</span>
            <span className="font-semibold">{tourData.rating}</span>
            <span className="opacity-80">({tourData.reviewCount} đánh giá)</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tour Details */}
          <div className="lg:col-span-2">
            {/* Price Card */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-red-600">
                    {formatVnd(tourData.price)}
                  </div>
                  <div className="text-lg text-gray-400 line-through">
                    {formatVnd(tourData.originalPrice)}
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {tourData.discount}
                  </span>
                  <div className="text-sm text-gray-600 mt-1">
                    {tourData.duration}
                  </div>
                </div>
              </div>

              <Link href={`/booking?packageId=${tourData.id}`}>
                <MotionButton
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Đặt tour ngay
                </MotionButton>
              </Link>
            </MotionDiv>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex space-x-4 border-b mb-6">
                {[
                  { key: 'overview', label: 'Tổng quan' },
                  { key: 'itinerary', label: 'Lịch trình' },
                  { key: 'included', label: 'Bao gồm' },
                  { key: 'reviews', label: 'Đánh giá' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`py-3 px-4 -mb-px border-b-2 ${activeTab === tab.key ? 'border-red-600 text-red-600' : 'border-transparent text-gray-600'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === 'overview' && (
                <div>
                  <MotionH3 className="text-xl font-semibold mb-4">Điểm nổi bật</MotionH3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tourData.highlights.map((h: string, idx: number) => (
                      <div key={idx} className="flex items-center space-x-2 text-gray-700">
                        <span className="text-green-600">✓</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div>
                  <MotionH3 className="text-xl font-semibold mb-4">Lịch trình chi tiết</MotionH3>
                  <div className="space-y-4">
                    {tourData.itinerary.map((item: ItineraryItem, idx: number) => (
                      <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                        <div className="font-semibold text-gray-900">Ngày {item.day}</div>
                        <p className="text-gray-700 mt-2 whitespace-pre-line">{item.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'included' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <MotionH3 className="text-lg font-semibold mb-3">Bao gồm</MotionH3>
                    <ul className="space-y-2">
                      {tourData.included.map((inc: string, idx: number) => (
                        <li key={idx} className="flex items-center text-gray-700"><span className="text-green-600 mr-2">✓</span>{inc}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <MotionH3 className="text-lg font-semibold mb-3">Không bao gồm</MotionH3>
                    <ul className="space-y-2">
                      {tourData.notIncluded.map((exc: string, idx: number) => (
                        <li key={idx} className="flex items-center text-gray-700"><span className="text-red-600 mr-2">✗</span>{exc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <MotionH3 className="text-lg font-semibold">Đánh giá ({reviews.length})</MotionH3>
                  {reviews.map(r => (
                    <div key={r.id} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">{r.name}</div>
                        <div>⭐ {r.rating}</div>
                      </div>
                      <p className="text-gray-700 mt-2">{r.comment}</p>
                      {r.photos?.length > 0 && (
                        <div className="flex gap-2 mt-3">
                          {r.photos.map((p, i) => (
                            <img key={i} className="h-20 w-28 object-cover rounded" src={p} alt="review" />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="p-4 bg-white rounded-xl border">
                    <div className="font-semibold mb-2">Viết đánh giá</div>
                    {/* Placeholder form; implement POST later */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input className="border p-3 rounded" placeholder="Tên của bạn" />
                      <input className="border p-3 rounded" placeholder="Số sao (1-5)" />
                    </div>
                    <textarea className="border p-3 rounded w-full mt-3" rows={4} placeholder="Cảm nhận của bạn"></textarea>
                    <MotionButton className="mt-3 bg-blue-600 text-white px-5 py-3 rounded">Gửi đánh giá</MotionButton>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <div className="text-xl font-semibold mb-4">Đặt tour nhanh</div>
              <div className="space-y-3">
                <input type="date" className="w-full border p-3 rounded" />
                <input type="number" min={1} defaultValue={2} className="w-full border p-3 rounded" placeholder="Số người" />
                <Link href={`/booking?packageId=${tourData.id}`}>
                  <MotionButton className="w-full bg-green-600 text-white py-3 rounded-lg">Tiếp tục đặt chỗ</MotionButton>
                </Link>
              </div>
              <div className="mt-6 text-sm text-gray-600">
                <div>Khởi hành: {tourData.departure}</div>
                <div>Thời lượng: {tourData.duration}</div>
                <div>Nhóm: {tourData.groupSize}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 