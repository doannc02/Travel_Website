"use client";
import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Destination {
  id?: number;
  city: string;
  province: string;
  country: string;
  description: string;
  image: string;
  heroImage: string | null;
  rating: number;
  reviewCount: number;
  hotels: number;
  fromPrice: number;
  toPrice: number;
  bestTime: string;
  category: string;
  popularity: string;
  temperature: string | null;
  condition: string | null;
  humidity: string | null;
  rainfall: string | null;
  flightTime: string | null;
  ferryTime: string | null;
  carTime: string | null;
}

interface DestinationModalProps {
  destination?: Destination | null;
  onClose: () => void;
}

const categories = [
  "Biển đảo",
  "Núi rừng",
  "Thành phố",
  "Văn hóa lịch sử",
  "Ẩm thực",
  "Thiên nhiên",
];

const popularityLevels = ["low", "medium", "high"];

export default function DestinationModal({
  destination,
  onClose,
}: DestinationModalProps) {
  const [formData, setFormData] = useState<Destination>({
    city: "",
    province: "",
    country: "Việt Nam",
    description: "",
    image: "",
    heroImage: "",
    rating: 0,
    reviewCount: 0,
    hotels: 0,
    fromPrice: 0,
    toPrice: 0,
    bestTime: "",
    category: "",
    popularity: "medium",
    temperature: "",
    condition: "",
    humidity: "",
    rainfall: "",
    flightTime: "",
    ferryTime: "",
    carTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (destination) {
      setFormData(destination);
    }
  }, [destination]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? 0 : parseFloat(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = destination?.id
        ? `/api/admin/destinations/${destination.id}`
        : "/api/admin/destinations";

      const method = destination?.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onClose();
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Có lỗi xảy ra");
      }
    } catch (err) {
      setError("Có lỗi xảy ra khi kết nối đến server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-6 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-xl bg-white">
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b">
          <h3 className="text-xl font-semibold text-gray-900">
            {destination ? "Chỉnh sửa địa điểm" : "Thêm địa điểm mới"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-4 space-y-4 max-h-[70vh] overflow-y-auto pr-2"
        >
          {/* City + Province */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Thành phố *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tỉnh/Thành *
              </label>
              <input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleChange}
                required
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quốc gia
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mô tả *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="mt-1 block w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ảnh đại diện *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ảnh banner
              </label>
              <input
                type="url"
                name="heroImage"
                value={formData.heroImage || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Rating + Review + Hotels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Đánh giá
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleNumberChange}
                min="0"
                max="5"
                step="0.1"
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Số đánh giá
              </label>
              <input
                type="number"
                name="reviewCount"
                value={formData.reviewCount}
                onChange={handleNumberChange}
                min="0"
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Số khách sạn
              </label>
              <input
                type="number"
                name="hotels"
                value={formData.hotels}
                onChange={handleNumberChange}
                min="0"
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Prices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Giá từ (VND)
              </label>
              <input
                type="number"
                name="fromPrice"
                value={formData.fromPrice}
                onChange={handleNumberChange}
                min="0"
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Giá đến (VND)
              </label>
              <input
                type="number"
                name="toPrice"
                value={formData.toPrice}
                onChange={handleNumberChange}
                min="0"
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Best time + Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Thời điểm tốt nhất
              </label>
              <input
                type="text"
                name="bestTime"
                value={formData.bestTime}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Danh mục *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-1 block w-full border rounded-md px-3 py-2"
              >
                <option value="">Chọn danh mục</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Popularity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Độ phổ biến
            </label>
            <select
              name="popularity"
              value={formData.popularity}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md px-3 py-2"
            >
              {popularityLevels.map((level) => (
                <option key={level} value={level}>
                  {level === "low"
                    ? "Thấp"
                    : level === "medium"
                    ? "Trung bình"
                    : "Cao"}
                </option>
              ))}
            </select>
          </div>

          {/* Weather */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nhiệt độ
              </label>
              <input
                type="text"
                name="temperature"
                value={formData.temperature || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Điều kiện thời tiết
              </label>
              <input
                type="text"
                name="condition"
                value={formData.condition || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Độ ẩm
              </label>
              <input
                type="text"
                name="humidity"
                value={formData.humidity || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Lượng mưa
              </label>
              <input
                type="text"
                name="rainfall"
                value={formData.rainfall || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Transport Times */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Thời gian bay
              </label>
              <input
                type="text"
                name="flightTime"
                value={formData.flightTime || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Thời gian phà
              </label>
              <input
                type="text"
                name="ferryTime"
                value={formData.ferryTime || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Thời gian đi ô tô
              </label>
              <input
                type="text"
                name="carTime"
                value={formData.carTime || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
