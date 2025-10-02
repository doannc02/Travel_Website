"use client";
import { useState, useEffect } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import {
  MotionDiv,
  MotionH2,
  MotionH3,
  MotionButton,
} from "../../components/common/MotionWrapper";

interface Flight {
  id: number;
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  originalPrice: number;
  discount: string;
  stops: string;
  aircraft: string;
  class: string;
  availableSeats: number;
  departureDate: string;
  returnDate?: string;
  createdAt: string;
}

export default function FlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await fetch("/api/admin/flights");
      if (response.ok) {
        const data = await response.json();
        setFlights(data.flights || []);
      } else {
        console.error("Failed to fetch flights:", response.statusText);
        setFlights([]);
      }
    } catch (error) {
      console.error("Failed to fetch flights:", error);
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa chuyến bay này?")) {
      try {
        const response = await fetch(`/api/admin/flights/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setFlights(flights.filter((f) => f.id !== id));
        }
      } catch (error) {
        console.error("Failed to delete flight:", error);
      }
    }
  };

  const filteredFlights = flights.filter(
    (flight) =>
      flight.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.departure.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.arrival.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <MotionH2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-gray-900"
          >
            Quản lý Chuyến bay
          </MotionH2>
          <p className="text-gray-600">
            Quản lý tất cả chuyến bay trong hệ thống
          </p>
        </div>
        <MotionButton
          onClick={() => setShowModal(true)}
          className="bg-red-600 hover:bg-red-700 text-gray-900 px-4 py-2 rounded-lg flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusIcon className="h-5 w-5" />
          <span>Thêm chuyến bay</span>
        </MotionButton>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex space-x-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-900" />
              <input
                type="text"
                placeholder="Tìm kiếm chuyến bay..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
            <option value="">Tất cả hãng bay</option>
            <option value="Vietnam Airlines">Vietnam Airlines</option>
            <option value="VietJet Air">VietJet Air</option>
            <option value="Bamboo Airways">Bamboo Airways</option>
          </select>
        </div>
      </div>

      {/* Flights Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chuyến bay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành trình
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời gian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFlights.map((flight) => (
                <tr key={flight.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <PaperAirplaneIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {flight.airline}
                        </div>
                        <div className="text-sm text-gray-500">
                          {flight.flightNumber}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {flight.departure}
                      </div>
                      <div className="text-gray-500">→</div>
                      <div className="font-medium text-gray-900">
                        {flight.arrival}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>
                        {flight.departureTime} - {flight.arrivalTime}
                      </div>
                      <div className="text-gray-500">{flight.duration}</div>
                      <div className="text-xs text-blue-600">
                        {flight.stops}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <span className="line-through text-gray-500 mr-2">
                        {flight.originalPrice.toLocaleString("vi-VN")}đ
                      </span>
                      <span className="font-semibold text-red-600">
                        {flight.price.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                    <div className="text-xs text-green-600 font-medium">
                      Giảm {flight.discount}
                    </div>
                    <div className="text-xs text-gray-500">
                      {flight.availableSeats} ghế trống
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingFlight(flight)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setEditingFlight(flight)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(flight.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50">
            Trước
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50">
            Sau
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-900">
              Hiển thị <span className="font-medium">1</span> đến{" "}
              <span className="font-medium">10</span> trong tổng số{" "}
              <span className="font-medium">{filteredFlights.length}</span> kết
              quả
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Trước
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Sau
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
